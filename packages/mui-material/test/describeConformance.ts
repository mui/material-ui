import {
  describeConformance as baseDescribeConformance,
  ConformanceOptions,
} from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DefaultPropsProvider from '@mui/material/DefaultPropsProvider';

type ConformanceRenderResult = Awaited<ReturnType<ConformanceOptions['render']>>;

export interface MaterialConformanceOptions extends ConformanceOptions {
  /**
   * Returns the component's root when it is rendered outside the test
   * container, for example through a portal.
   */
  getRootElement?: (result: ConformanceRenderResult) => Element | null;
}

export default function describeConformance(
  minimalElement: React.ReactElement<unknown>,
  getOptions: () => MaterialConformanceOptions,
) {
  function getOptionsWithDefaults() {
    const { getRootElement, render, ...options } = getOptions();

    function withResolvedRoot(result: ConformanceRenderResult) {
      const root = getRootElement?.(result);

      if (!root) {
        throw new Error(
          `describeConformance: getRootElement did not return an element for ${options.muiName}.`,
        );
      }

      return {
        ...result,
        // The upstream harness reads only `firstChild` from the container
        // when asserting root behavior.
        container: { firstChild: root } as unknown as HTMLElement,
      };
    }

    return {
      ThemeProvider,
      createTheme,
      DefaultPropsProvider,
      ...options,
      render: getRootElement
        ? (node: Parameters<ConformanceOptions['render']>[0]) => {
            const result = render(node);

            return result instanceof Promise
              ? result.then(withResolvedRoot)
              : withResolvedRoot(result);
          }
        : render,
    };
  }

  return baseDescribeConformance(minimalElement, getOptionsWithDefaults);
}
