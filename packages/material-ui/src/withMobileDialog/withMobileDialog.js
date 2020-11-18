import * as React from 'react';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '../withWidth';

let warnedOnce = false;

/**
 * Dialog will responsively be full screen *at or below* the given breakpoint
 * (defaults to 'sm' for mobile devices).
 * Notice that this Higher-order Component is incompatible with server-side rendering.
 */
const withMobileDialog = (options = {}) => (Component) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      console.warn(
        [
          'Material-UI: The `withMobileDialog` function is deprecated.',
          'Head to https://material-ui.com/r/migration-v4/#dialog for a migration path.',
        ].join('\n'),
      );
      warnedOnce = true;
    }
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
