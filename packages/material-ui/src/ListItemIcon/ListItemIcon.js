import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    minWidth: 56,
    color: theme.palette.action.active,
    flexShrink: 0,
    display: 'inline-flex',
  },
});

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(props, ref) {
  const { classes, className, ...other } = props;

  return <div className={clsx(classes.root, className)} ref={ref} {...other} />;
});

ListItemIcon.propTypes = {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children: PropTypes.element.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiListItemIcon' })(ListItemIcon);
