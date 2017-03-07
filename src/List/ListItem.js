// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('MuiListItem', theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
  },
  container: {
    position: 'relative',
  },
  keyboardFocused: {
    background: theme.palette.text.divider,
  },
  default: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  dense: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  disabled: {
    opacity: 0.5,
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.text.lightDivider}`,
  },
  gutters: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.text.divider,
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

class ListItem extends Component {
  static defaultProps = {
    button: false,
    component: 'div',
    dense: false,
    disabled: false,
    disableGutters: false,
    divider: false,
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
      classes,
      className: classNameProp,
      component: componentProp,
      dense,
      disabled,
      divider,
      disableGutters,
      ...other
    } = this.props;
    const isDense = dense || this.context.dense || false;
    const children = React.Children.toArray(childrenProp);

    const hasAvatar = children.some(value => {
      return value.type && value.type.muiName === 'ListItemAvatar';
    });

    const className = classNames(
      classes.root,
      {
        [classes.gutters]: !disableGutters,
        [classes.divider]: divider,
        [classes.disabled]: disabled,
        [classes.button]: button,
        [isDense || hasAvatar ? classes.dense : classes.default]: true,
      },
      classNameProp,
    );

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
        <div className={classes.container}>
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

ListItem.propTypes = {
  /**
   * If `true`, the ListItem will be a button.
   */
  button: PropTypes.bool,
  /**
   * The content of the component.
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
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   */
  divider: PropTypes.bool,
};

ListItem.contextTypes = {
  dense: PropTypes.bool,
};

ListItem.childContextTypes = {
  dense: PropTypes.bool,
};

export default withStyles(styleSheet)(ListItem);
