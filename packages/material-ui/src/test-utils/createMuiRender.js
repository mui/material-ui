import React from 'react';
import * as PropTypes from 'prop-types';
import { cleanup, render } from '@testing-library/react';

function muiRender(element, options = {}) {
  const { disableUnnmount = false, strict } = options;
  const Mode = strict ? React.StrictMode : React.Fragment;

  function TestWrapper({ children }) {
    return <Mode>{children}</Mode>;
  }
  TestWrapper.propTypes = {
    children: PropTypes.node,
  };

  if (!disableUnnmount) {
    cleanup();
  }

  const result = render(element, { wrapper: TestWrapper });

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
