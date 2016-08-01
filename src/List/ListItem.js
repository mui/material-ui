// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 8,
      paddingBottom: 8,
      textDecoration: 'none',
      '&keyboardFocused': {
        background: theme.palette.text.divider,
      },
    },
    gutters: theme.mixins.gutters({}),
  };
});

export default class ListItem extends Component {
  static propTypes = {
    button: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    gutters: PropTypes.bool,
  };

  static defaultProps = {
    component: 'div',
    gutters: true,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      button,
      className: classNameProp,
      component: componentProp,
      gutters,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });
    const className = classNames(classes.root, {
      [classes.gutters]: gutters,
    }, classNameProp);

    const listItemProps = { className, ...other };
    let component = componentProp;

    if (button) {
      component = ButtonBase;
      listItemProps.component = 'div';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    return React.createElement(component, listItemProps);
  }
}
