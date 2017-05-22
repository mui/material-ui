// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import ListItem from '../List/ListItem';

export const styleSheet = createStyleSheet('MuiMenuItem', (theme) => ({
  root: {
    ...theme.typography.subheading,
    height: 48,
    boxSizing: 'border-box',
    background: 'none',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:focus': {
      background: theme.palette.text.divider,
    },
    '&:hover': {
      backgroundColor: theme.palette.text.divider,
    },
  },
  selected: {
    backgroundColor: theme.palette.text.divider,
  },
}));

function MenuItem(props) {
  const {
    classes,
    className: classNameProp,
    component,
    selected,
    role,
    ...other
  } = props;

  const className = classNames(classes.root, {
    [classes.selected]: selected,
  }, classNameProp);

  const listItemProps = {};

  if (!component) {
    listItemProps.ripple = false;
  }

  return (
    <ListItem
      button
      role={role}
      tabIndex="-1"
      className={className}
      component={component}
      {...listItemProps}
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
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
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
  role: 'menuitem',
  selected: false,
};

export default withStyles(styleSheet)(MenuItem);
