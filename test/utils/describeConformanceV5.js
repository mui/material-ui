/* eslint-env mocha */
import { expect } from 'chai';
import * as React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createClientRender } from './createClientRender';
import {
  testClassName,
  testPropsSpread,
  describeRef,
  testRootClass,
  findRootComponent,
  testReactTestRenderer,
} from './describeConformance';

/**
 * Material-UI components have a `components` prop that allows rendering a different
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testComponentsProp(element, getOptions) {
  describe('prop: components', () => {
    it('can render another root component with the `components` prop', () => {
      const { mount, testComponentsRootPropWith: component = 'em' } = getOptions();

      const wrapper = mount(React.cloneElement(element, { components: { Root: component } }));

      expect(findRootComponent(wrapper, { component }).exists()).to.equal(true);
    });
  });
}

/**
 * Material-UI theme has a components section that allows specifying default props, overrides and variants
 * Components from @inheritComponent
 * @param {React.ReactElement} element
 * @param {() => ConformanceOptions} getOptions
 */
function testThemeComponents(element, getOptions) {
  const render = createClientRender();

  describe('theme: components', () => {
    it("respect theme's defaultProps", () => {
      const { muiName, testThemeComponentsDefaultPropName: testProp = 'id' } = getOptions();
      const theme = createMuiTheme({
        components: {
          [muiName]: {
            defaultProps: {
              [testProp]: 'testProp',
            },
          },
        },
      });

      const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.have.attribute(testProp, 'testProp');
    });

    it("respect theme's styleOverrides", () => {
      const { muiName } = getOptions();

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createMuiTheme({
        components: {
          [muiName]: {
            styleOverrides: {
              root: testStyle,
            },
          },
        },
      });

      const { container } = render(<ThemeProvider theme={theme}>{element}</ThemeProvider>);

      expect(container.firstChild).to.toHaveComputedStyle(testStyle);
    });

    it("respect theme's variants", () => {
      const { muiName, testVariantProps = {} } = getOptions();

      const testStyle = {
        marginTop: '13px',
      };

      const theme = createMuiTheme({
        components: {
          [muiName]: {
            variants: [
              {
                props: testVariantProps,
                style: testStyle,
              },
            ],
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          {React.cloneElement(element, { ...testVariantProps, 'data-testid': 'with-props' })}
          {React.cloneElement(element, { 'data-testid': 'without-props' })}
        </ThemeProvider>,
      );

      expect(getByTestId('with-props')).to.toHaveComputedStyle(testStyle);
      expect(getByTestId('without-props')).not.to.toHaveComputedStyle(testStyle);
    });
  });
}

const fullSuite = {
  componentsProp: testComponentsProp,
  mergeClassName: testClassName,
  propsSpread: testPropsSpread,
  refForwarding: describeRef,
  rootClass: testRootClass,
  reactTestRenderer: testReactTestRenderer,
  themeComponents: testThemeComponents,
};

/**
 * Tests various aspects of a component that should be equal across Material-UI
 * components.
 * @param {React.ReactElement} minimalElement - the component with it's minimal required props
 * @param {() => ConformanceOptions} getOptions
 */
export default function describeConformanceV5(minimalElement, getOptions) {
  const { after: runAfterHook = () => {}, only = Object.keys(fullSuite), skip = [] } = getOptions();
  describe('Material-UI component API', () => {
    after(runAfterHook);

    Object.keys(fullSuite)
      .filter((testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
      .forEach((testKey) => {
        const test = fullSuite[testKey];
        test(minimalElement, getOptions);
      });
  });
}
