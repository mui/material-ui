// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import ListItem from '../List/ListItem';

export const styleSheet = createStyleSheet('MuiMenuItem', (theme) => {
  return {
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
  };
});

export default class MenuItem extends Component {
  static propTypes = {
    /**
     * Menu item contents.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
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

  static defaultProps = {
    role: 'menuitem',
    selected: false,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      className: classNameProp,
      component,
      selected,
      role,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
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
}
