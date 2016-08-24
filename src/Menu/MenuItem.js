// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ListItem from '../List/ListItem';

export const styleSheet = createStyleSheet('MenuItem', (theme) => {
  const { palette, typography, transitions } = theme;
  return {
    root: {
      ...typography.subheading,
      height: 48,
      background: 'none',
      transition: transitions.create('background-color', '250ms'),
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      '&:focus': {
        background: palette.text.divider,
      },
      '&:hover': {
        backgroundColor: palette.text.divider,
      },
    },
    selected: {
      backgroundColor: palette.text.divider,
    },
  };
}, { priority: 10 });

export default class MenuItem extends Component {
  static propTypes = {
    /**
     * Menu item contents
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * @ignore
     */
    role: PropTypes.string,
    /**
     * Use to apply selected styling
     */
    selected: PropTypes.bool,
  };

  static defaultProps = {
    role: 'menuitem',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      className: classNameProp,
      selected,
      role,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.selected]: selected,
    }, classNameProp);

    return (
      <ListItem
        button
        role={role}
        tabIndex="-1"
        className={className}
        ripple={false}
        {...other}
      />
    );
  }
}
