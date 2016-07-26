// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
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
      '& selected': {
        backgroundColor: palette.text.divider,
      },
    },
  };
});

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
    onBlur: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
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

  state = { focused: false };

  handleBlur = (event) => {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleFocus = (event) => {
    this.setState({ focused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  render() {
    const {
      className: classNameProp,
      onBlur, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      selected,
      role,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const className = classNames(classes.root, {
      [classes.selected]: selected,
    }, classNameProp);

    return (
      <ListItem
        button
        role={role}
        tabIndex={this.state.focused ? '0' : '-1'}
        className={className}
        ripple={false}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        {...other}
      />
    );
  }
}
