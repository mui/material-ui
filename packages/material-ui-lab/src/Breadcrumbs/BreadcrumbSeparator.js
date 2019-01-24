import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const height = 24;

const styles = theme => ({
  root: {
    userSelect: 'none',
    height,
    lineHeight: `${height}px`,
    color: theme.palette.grey[400],
    marginLeft: 8,
    marginRight: 8,
  },
});

/**
 * @ignore - internal component.
 */
function BreadcrumbSeparator(props) {
  const { classes, className, separator, ...other } = props;

  return (
    <li aria-hidden="true" className={classNames(classes.root, className)} {...other}>
      {separator}
    </li>
  );
}

BreadcrumbSeparator.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  separator: PropTypes.node.isRequired,
};

export default withStyles(styles, { name: 'MuiPrivateBreadcrumbSeparator' })(BreadcrumbSeparator);
