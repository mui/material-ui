import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  /* Styles applied to the root element. */
  root: {},
};

function Breadcrumb(props) {
  const { classes, className, ...other } = props;

  return (
    <Typography
      component="li"
      color="textSecondary"
      className={classNames(classes.root, className)}
      {...other}
    />
  );
}

Breadcrumb.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiBreadcrumb' })(Breadcrumb);
