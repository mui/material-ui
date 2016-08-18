// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
      '& keyboardFocused': {
        background: theme.palette.text.divider,
      },
    },
    default: {
      paddingTop: 19,
      paddingBottom: 19,
    },
    dense: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    disabled: {
      opacity: 0.5,
    },
    divider: {
      borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
    },
    gutters: {
      paddingLeft: 16,
      paddingRight: 16,
    },
  };
}, { index: 10 });

export default class ListItem extends Component {
  static propTypes = {
    button: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * @ignore
     */
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    divider: PropTypes.bool,
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
      dense,
      disabled,
      divider,
      gutters,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.root, {
      [classes.gutters]: gutters,
      [classes.divider]: divider,
      [classes.disabled]: disabled,
      [dense ? classes.dense : classes.default]: true,
    }, classNameProp);

    const listItemProps = { className, disabled, ...other };
    let component = componentProp;

    if (button) {
      component = ButtonBase;
      listItemProps.component = 'div';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    return React.createElement(component, listItemProps);
  }
}
