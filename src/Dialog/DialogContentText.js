// @inheritedComponent Typography

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';

export const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
  },
});

function DialogContentText(props) {
  const { children, classes, className, ...other } = props;

  return (
    <Typography
      component="p"
      variant="subheading"
      className={classNames(classes.root, className)}
      {...other}
    >
      {children}
    </Typography>
  );
}

DialogContentText.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiDialogContentText' })(DialogContentText);
