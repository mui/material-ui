import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    marginBottom: 12,
  },
};

const DialogContentText = React.forwardRef(function DialogContentText(props, ref) {
  return <Typography component="p" variant="body1" color="textSecondary" ref={ref} {...props} />;
});

DialogContentText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiDialogContentText' })(DialogContentText);
