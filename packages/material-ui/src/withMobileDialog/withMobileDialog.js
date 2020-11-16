import * as React from 'react';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '../withWidth';

/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server-side rendering.
 */
const withMobileDialog = (options = {}) => (Component) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Material-UI: The `withMobileDialog` function is deprecated. See https://github.com/mui-org/material-ui/pull/23202.',
    );
  }
  const { breakpoint = 'sm' } = options;

  function WithMobileDialog(props) {
    return <Component fullScreen={isWidthDown(breakpoint, props.width)} {...props} />;
  }

  WithMobileDialog.propTypes = {
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  };

  return withWidth()(WithMobileDialog);
};

export default withMobileDialog;
