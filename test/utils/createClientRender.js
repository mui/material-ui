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

  return result;
}

export function createClientRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  afterEach(() => {
    act(() => {
      cleanup();
    });
  });

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, strict });
  };
}

const fireEvent = Object.assign(rtlFireEvent, {
  // polyfill event.key for chrome 49 (supported in Material-UI v4)
  // for user-interactions react does the polyfilling but manually created
  // events don't have this luxury
  keyDown(element, options = {}) {
    const event = createEvent.keyDown(element, options);
    Object.defineProperty(event, 'key', {
      get() {
        return options.key || '';
      },
    });

    rtlFireEvent(element, event);
  },
  keyUp(element, options = {}) {
    const event = createEvent.keyUp(element, options);
    Object.defineProperty(event, 'key', {
      get() {
        return options.key || '';
      },
    });

    rtlFireEvent(element, event);
  },
});

export * from '@testing-library/react/pure';
export { act, cleanup, fireEvent };

export function render() {
  throw new Error(
    "Don't use `render` directly. Instead use the return value from `createClientRender`",
  );
}
