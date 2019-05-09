import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    marginBottom: 16,
  },
};

const DialogContentText = React.forwardRef(function DialogContentText(props, ref) {
  return <Typography component="p" variant="body1" color="textSecondary" ref={ref} {...props} />;
});

DialogContentText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiDialogContentText' })(DialogContentText);
