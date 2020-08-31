/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  buildQueries,
  cleanup,
  createEvent,
  fireEvent as rtlFireEvent,
  queries,
  render as testingLibraryRender,
  prettyDOM,
  within,
} from '@testing-library/react/pure';

// holes are *All* selectors which aren't necessary for id selectors
const [queryDescriptionOf, , getDescriptionOf, , findDescriptionOf] = buildQueries(
  function queryAllDescriptionsOf(container, element) {
    return container.querySelectorAll(`#${element.getAttribute('aria-describedby')}`);
  },
  function getMultipleError() {
    return `Found multiple descriptions. An element should be described by a unique element.`;
  },
  function getMissingError() {
    return `Found no describing element.`;
  },
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
function clientRender(element, options = {}) {
  const { baseElement, strict = true, wrapper: InnerWrapper = React.Fragment } = options;

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper({ children }) {
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

  /**
   * convenience helper. Better than repeating all props.
   */
  result.setProps = function setProps(props) {
    result.rerender(React.cloneElement(element, props));
    return result;
  };

  result.forceUpdate = function forceUpdate() {
    result.rerender(
      React.cloneElement(element, {
        'data-force-update': String(Math.random()),
      }),
    );
    return result;
  };

  return result;
}

export function createClientRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  afterEach(async () => {
    // act to flush effect cleanup functions
    // state updates during this phase are safe
    // TODO: Revisit once https://github.com/testing-library/react-testing-library/pull/768 is resolved.
    await act(async () => {
      await cleanup();
    });
  });

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, strict });
  };
}

const fireEvent = Object.assign(rtlFireEvent, {
  // polyfill event.key(Code) for chrome 49 and edge 15 (supported in Material-UI v4)
  // for user-interactions react does the polyfilling but manually created
  // events don't have this luxury
  keyDown(element, options = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keydown
      const error = new Error(
        `\`keydown\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 },
        )}`,
      );
      // We're only interested in the callsite of fireEvent.keyDown
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }

    const event = createEvent.keyDown(element, options);
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
  keyUp(element, options = {}) {
    // `element` shouldn't be `document` but we catch this later anyway
    const document = element.ownerDocument || element;
    const target = document.activeElement || document.body || document.documentElement;
    if (target !== element) {
      // see https://www.w3.org/TR/uievents/#keyup
      const error = new Error(
        `\`keyup\` events can only be targeted at the active element which is ${prettyDOM(
          target,
          undefined,
          { maxDepth: 1 },
        )}`,
      );
      // We're only interested in the callsite of fireEvent.keyUp
      error.stack = error.stack
        .split('\n')
        .filter((line) => !/at Function.key/.test(line))
        .join('\n');
      throw error;
    }
    const event = createEvent.keyUp(element, options);
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
// We import from `@testing-library/react` and `@testing-library/dom` before creating a JSDOM.
// At this point a global document isn't available yet. Now it is.
export const screen = within(document.body);

export function render() {
  throw new Error(
    "Don't use `render` directly. Instead use the return value from `createClientRender`",
  );
}
