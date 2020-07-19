/**
 * Copy and paste from https://github.com/mui-org/material-ui/blob/master/test/utils/createClientRender.js.
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { UtilClassToUse } from './test-utils';
import { LocalizationProvider } from '../LocalizationProvider';
import {
  act,
  buildQueries,
  cleanup,
  createEvent,
  fireEvent as rtlFireEvent,
  queries,
  render as testingLibraryRender,
  prettyDOM,
} from '@testing-library/react/pure';

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf(container: HTMLElement, element: HTMLElement) {
    return container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`);
  } as any,
  function getMultipleError() {
    return `Found multiple descriptions. An element should be described by a unique element.`;
  },
  function getMissingError() {
    return `Found no describing element.`;
  }
);

const customQueries = { queryDescriptionOf, getDescriptionOf, findDescriptionOf };

/**
 *
 * @param {React.ReactElement} element
 * @param {object} [options]
 * @param {boolean} [options.baseElement] - https://testing-library.com/docs/react-testing-library/api#baseelement-1
 * @param {boolean} [options.disableUnnmount] - if true does not cleanup before mount
 * @param {boolean} [options.strict] - wrap in React.StrictMode?
 * @returns {import('@testing-library/react').RenderResult<typeof queries & typeof customQueries> & { setProps(props: object): void}}
 * TODO: type return RenderResult in setProps
 */
function clientRender(
  element: any,
  options: { wrapper?: any; baseElement?: any; strict?: boolean } = {}
) {
  const { baseElement, strict = true, wrapper: InnerWrapper = React.Fragment } = options;

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Mode>
        <InnerWrapper>{children}</InnerWrapper>
      </Mode>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };

  const result = testingLibraryRender(element, {
    baseElement,
    queries: { ...queries, ...customQueries },
    wrapper: Wrapper,
  });

  return result;
}

export function createClientRender(globalOptions: { strict?: boolean } = {}) {
  const { strict: globalStrict } = globalOptions;

  afterEach(async () => {
    // If this issues an act() warning you probably didn't
    // wait for an async event in your test (or didn't wrap it in act() at all).
    // please wait for every update in your test and make appropriate assertions
    await cleanup();
  });

  return function configuredClientRender(element: any, options: { strict?: boolean } = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(
      <LocalizationProvider dateAdapter={UtilClassToUse}>{element}</LocalizationProvider>,
      {
        ...localOptions,
        strict,
      }
    );
  };
}

const fireEvent = Object.assign(rtlFireEvent, {
  // polyfill event.key(Code) for chrome 49 and edge 15 (supported in Material-UI v4)
  // for user-interactions react does the polyfilling but manually created
  // events don't have this luxury
  keyDown(element: any, options: { key?: string; keyCode?: string } = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keydown
      const error = new Error(
        `\`keydown\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 }
        )}`
      );
      // We're only interested in the callsite of fireEvent.keyDown
      error.stack = error.stack
        ? error.stack
            .split('\n')
            .filter((line) => !/at Function.key/.test(line))
            .join('\n')
        : '';
      throw error;
    }

    const event = createEvent.keyDown(element, options) as any;
    Object.defineProperty(event, 'key', {
      get() {
        return options.key || '';
      },
    });
    if (options.keyCode !== undefined && event.keyCode === 0) {
      Object.defineProperty(event, 'keyCode', {
        get() {
          return options.keyCode;
        },
      });
    }

    rtlFireEvent(element, event);
  },
  keyUp(element: any, options: { key?: string; keyCode?: string } = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keyup
      const error = new Error(
        `\`keyup\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 }
        )}`
      );
      // We're only interested in the callsite of fireEvent.keyUp
      error.stack = error.stack
        ? error.stack
            .split('\n')
            .filter((line) => !/at Function.key/.test(line))
            .join('\n')
        : '';
      throw error;
    }
    const event = createEvent.keyUp(element, options) as any;
    Object.defineProperty(event, 'key', {
      get() {
        return options.key || '';
      },
    });
    if (options.keyCode !== undefined && event.keyCode === 0) {
      Object.defineProperty(event, 'keyCode', {
        get() {
          return options.keyCode;
        },
      });
    }

    rtlFireEvent(element, event);
  },
});

export * from '@testing-library/react/pure';
export { act, cleanup, fireEvent };

export function render() {
  throw new Error(
    "Don't use `render` directly. Instead use the return value from `createClientRender`"
  );
}
