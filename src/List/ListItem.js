// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('ListItem', (theme) => {
  return {
    listItem: {
      display: 'flex',
      flex: '1 1 auto',  // grow primary portion so that secondary is right-aligned
      alignItems: 'center',
      position: 'relative',
      textDecoration: 'none',
    },
    listItemContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    keyboardFocused: {
      background: theme.palette.text.divider,
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
});

export default class ListItem extends Component {
  static propTypes = {
    button: PropTypes.bool,
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
    styleManager: PropTypes.object.isRequired,
  };

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

    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(classes.listItem, {
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

    const children = React.Children.toArray(childrenProp);

    if (
      children.length &&
      children[children.length - 1].type &&
      children[children.length - 1].type.muiName === 'ListItemSecondaryAction'
    ) {
      const secondaryAction = children.pop();
      return (
        <div className={classes.listItemContainer}>
          {React.createElement(component, listItemProps, children)}
          {secondaryAction}
        </div>
      );
    }

    return React.createElement(component, listItemProps, children);
  }
}
