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
  render,
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
 * Profiles the children if run with --reporter test/ProfilerReporter.js
 */
function Profiler({ children }) {
  const { profilerId: id, profilerOnRender: handleRender } = global;

  if (id === undefined) {
    return children;
  }

  return (
    <React.Profiler id={id} onRender={handleRender}>
      {children}
    </React.Profiler>
  );
}
Profiler.propTypes = { children: PropTypes.node };

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
  const {
    baseElement,
    disableUnnmount = false,
    strict = false,
    wrapper: InnerWrapper = React.Fragment,
  } = options;

  if (!disableUnnmount) {
    cleanup();
  }

  const Mode = strict ? React.StrictMode : React.Fragment;
  function Wrapper({ children }) {
    return (
      <Mode>
        <Profiler>
          <InnerWrapper>{children}</InnerWrapper>
        </Profiler>
      </Mode>
    );
  }
  Wrapper.propTypes = { children: PropTypes.node };

  const result = render(element, {
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

export * from '@testing-library/react';
// in case someone accidentally imports `render`. we want to use a single API
export { act, cleanup, clientRender as render, fireEvent };
