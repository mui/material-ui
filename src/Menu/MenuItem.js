// @inheritedComponent ListItem

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styles = theme => ({
  root: {
    ...theme.typography.subheading,
    height: theme.spacing.unit * 3,
    boxSizing: 'content-box',
    width: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  selected: {},
});

function MenuItem(props) {
  const { classes, className, component, selected, role, ...other } = props;

  return (
    <ListItem
      button
      role={role}
      tabIndex={-1}
      className={classNames(classes.root, { [classes.selected]: selected }, className)}
      component={component}
      {...other}
    />
  );
}

MenuItem.propTypes = {
  /**
   * Menu item contents.
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
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * Use to apply selected styling.
   */
  selected: PropTypes.bool,
};

MenuItem.defaultProps = {
  component: 'li',
  role: 'menuitem',
  selected: false,
};

export default withStyles(styles, { name: 'MuiMenuItem' })(MenuItem);
