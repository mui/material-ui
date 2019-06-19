import React from 'react';
import { cleanup, render } from '@testing-library/react';

function muiRender(element, options = {}) {
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

export function createMuiRender(globalOptions = {}) {
  const { strict: globalStrict } = globalOptions;

  return function configuredMuiRender(element, options = {}) {
    const { strict = globalStrict, ...localOptions } = options;

    return muiRender(element, { ...localOptions, strict });
  };
}

export * from '@testing-library/react';
export { cleanup, muiRender as render };
