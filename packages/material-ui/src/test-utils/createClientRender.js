import React from 'react';
import { cleanup, render } from '@testing-library/react';

function clientRender(element, options = {}) {
  const { disableUnnmount = false, strict } = options;

  if (!disableUnnmount) {
    cleanup();
  }

  const Mode = strict ? React.StrictMode : React.Fragment;
  const result = render(element, { wrapper: Mode });

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

export * from '@testing-library/react';
// in case someone accidentally imports `render`. we want to use a single API
export { cleanup, clientRender as render };
