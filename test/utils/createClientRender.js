import React from 'react';
import { cleanup, render } from '@testing-library/react';

/**
 *
 * @param {React.ReactElement} element
 * @param {object} [options]
 * @param {boolean} [options.baseElement] - https://testing-library.com/docs/react-testing-library/api#baseelement-1
 * @param {boolean} [options.disableUnnmount] - if true does not cleanup before mount
 * @param {boolean} [options.strict] - wrap in React.StrictMode?
 * @returns {import('@testing-library/react').RenderResult & { setProps(props: object): void}}
 * TODO: type return RenderResult in setProps
 */
function clientRender(element, options = {}) {
  const { baseElement, disableUnnmount = false, strict = false } = options;

  if (!disableUnnmount) {
    cleanup();
  }

  const Mode = strict ? React.StrictMode : React.Fragment;
  const result = render(element, { baseElement, wrapper: Mode });

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

  const baseElement = document.createElement('div');
  baseElement.className = 'rtl--baseElement';
  document.body.appendChild(baseElement);

  return function configuredClientRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return clientRender(element, { ...localOptions, baseElement, strict });
  };
}

export * from '@testing-library/react';
// in case someone accidentally imports `render`. we want to use a single API
export { cleanup, clientRender as render };
