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

// https://github.com/testing-library/dom-testing-library/issues/723
// hide ByLabelText queries since they only support firefox >= 56, not IE 1:
// - HTMLInputElement.prototype.labels https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/labels

function queryAllByLabelText(container, label) {
  throw new Error(
    `*ByLabelText() relies on features that are not available in older browsers. Prefer \`*ByRole(someRole, { name: '${label}' })\` `,
  );
}
const [
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
] = buildQueries(
  queryAllByLabelText,
  function getMultipleError() {
    throw new Error('not implemented');
  },
  function getMissingError() {
    throw new Error('not implemented');
  },
);

const customQueries = {
  queryDescriptionOf,
  getDescriptionOf,
  findDescriptionOf,
  queryAllByLabelText,
  queryByLabelText,
  getAllByLabelText,
  getByLabelText,
  findAllByLabelText,
  findByLabelText,
};

/**
 * @typedef {object} RenderOptions
 * @property {HTMLElement} [options.baseElement] - https://testing-library.com/docs/react-testing-library/api#baseelement-1
 * @property {HTMLElement} [options.container] - https://testing-library.com/docs/react-testing-library/api#container
 * @property {boolean} [options.disableUnnmount] - if true does not cleanup before mount
 * @property {boolean} [options.hydrate] - https://testing-library.com/docs/react-testing-library/api#hydrate
 * @property {boolean} [options.strict] - wrap in React.StrictMode?
 */

/**
 *
 * @param {React.ReactElement} element
 * @param {RenderOptions} [options]
 * @returns {import('@testing-library/react').RenderResult<typeof queries & typeof customQueries> & { setProps(props: object): void}}
 * TODO: type return RenderResult in setProps
 */
function clientRender(element, options = {}) {
  const {
    baseElement,
    container,
    hydrate,
    strict = true,
    wrapper: InnerWrapper = React.Fragment,
  } = options;

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
    container,
    hydrate,
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

/**
 * @param {RenderOptions} globalOptions
 * @returns {clientRender}
 */
export function createClientRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  // save stack to re-use in async afterEach
  const { stack: createClientRenderStack } = new Error();
  afterEach(async () => {
    if (setTimeout.hasOwnProperty('clock')) {
      const error = Error(
        "Can't cleanup before fake timers are restored.\n" +
          'Be sure to:\n' +
          '  1. Restore the clock in `afterEach` instead of `after`.\n' +
          '  2. Move the test hook to restore the clock before the call to `createClientRender()`.',
      );
      // Use saved stack otherwise the stack trace will not include the test location.
      error.stack = createClientRenderStack;
      throw error;
    }

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
