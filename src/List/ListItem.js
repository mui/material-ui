// @flow weak

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('MuiListItem', (theme) => {
  const { palette, transitions } = theme;
  return {
    listItem: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
    },
    listItemContainer: {
      position: 'relative',
    },
    keyboardFocused: {
      background: palette.text.divider,
    },
    default: {
      paddingTop: 12,
      paddingBottom: 12,
    },
    dense: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    disabled: {
      opacity: 0.5,
    },
    divider: {
      borderBottom: `1px solid ${palette.text.lightDivider}`,
    },
    gutters: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    button: {
      transition: transitions.create('background-color', {
        duration: transitions.duration.short,
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: palette.text.divider,
        '&$disabled': {
          backgroundColor: 'transparent',
        },
      },
    },
  };
});

export default class ListItem extends Component {
  static propTypes = {
    button: PropTypes.bool,
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a ReactElement.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    dense: PropTypes.bool,
    /**
     * @ignore
     */
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    gutters: PropTypes.bool,
  };

  static defaultProps = {
    button: false,
    component: 'div',
    dense: false,
    disabled: false,
    divider: false,
    gutters: true,
  };

  static contextTypes = {
    dense: PropTypes.bool,
    styleManager: customPropTypes.muiRequired,
  };

  static childContextTypes = {
    dense: PropTypes.bool,
  };

  getChildContext() {
    return {
      dense: this.props.dense || this.context.dense || false,
    };
  }

  render() {
    const {
      button,
      children: childrenProp,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      divider,
      gutters,
      ...other
    } = this.props;
    const isDense = dense || this.context.dense || false;
    const classes = this.context.styleManager.render(styleSheet);
    const children = React.Children.toArray(childrenProp);

    const hasAvatar = children.some((value) => {
      return value.type && value.type.name === 'ListItemAvatar';
    });

    const className = classNames(classes.listItem, {
      [classes.gutters]: gutters,
      [classes.divider]: divider,
      [classes.disabled]: disabled,
      [classes.button]: button,
      [isDense || hasAvatar ? classes.dense : classes.default]: true,
    }, classNameProp);

    const listItemProps = { className, disabled, ...other };
    let ComponentMain = componentProp;

    if (button) {
      ComponentMain = ButtonBase;
      listItemProps.component = componentProp || 'div';
      listItemProps.keyboardFocusedClassName = classes.keyboardFocused;
    }

    if (
      children.length &&
      children[children.length - 1].type &&
      children[children.length - 1].type.muiName === 'ListItemSecondaryAction'
    ) {
      const secondaryAction = children.pop();
      return (
        <div className={classes.listItemContainer}>
          <ComponentMain {...listItemProps}>
            {children}
          </ComponentMain>
          {secondaryAction}
        </div>
      );
    }

    return (
      <ComponentMain {...listItemProps}>
        {children}
      </ComponentMain>
    );
  }
}
