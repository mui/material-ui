// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
};

function DialogContentText(props) {
  return <Typography component="p" variant="subheading" color="textSecondary" {...props} />;
}

DialogContentText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'MuiDialogContentText' })(DialogContentText);
