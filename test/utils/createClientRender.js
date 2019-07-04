/* eslint-env mocha */
import React from 'react';
import {
  act,
  buildQueries,
  cleanup,
  createEvent,
  fireEvent as rtlFireEvent,
  queries,
  render,
} from '@testing-library/react';

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
  const { baseElement, disableUnnmount = false, strict = false } = options;

  if (!disableUnnmount) {
    cleanup();
  }

  const Mode = strict ? React.StrictMode : React.Fragment;
  const result = render(element, {
    baseElement,
    queries: { ...queries, ...customQueries },
    wrapper: Mode,
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
  let baseElement;

  before(() => {
    baseElement = document.createElement('div');
    baseElement.className = 'rtl--baseElement';
    document.body.appendChild(baseElement);
  });

  after(() => {
    baseElement.parentNode.removeChild(baseElement);
    baseElement = null;
  });

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, baseElement, strict });
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
