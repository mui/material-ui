// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import ButtonBase from '../internal/ButtonBase';
import { getContrastText } from '../styles/palette';

export const styleSheet = createStyleSheet('Button', (theme) => {
  const { typography, palette, transitions, shadows } = theme;

  return {
    root: {
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeightMedium,
      fontFamily: typography.fontFamily,
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 88,
      height: 36,
      padding: '0px 16px',
      borderRadius: 2,
      color: palette.text.primary,
      backgroundColor: 'transparent',
      transition: transitions.multi(['background-color', 'box-shadow'], '250ms'),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: palette.text.divider,
      },
    },
    compact: {
      padding: '0 8px',
      minWidth: 64,
    },
    disabled: {
      opacity: 0.4,
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    primary: {
      color: palette.primary[500],
    },
    accent: {
      color: palette.accent.A200,
    },
    contrast: {
      color: palette.type === 'light' ? palette.shades.dark.primary : palette.shades.light.secondary,
    },
    raised: {
      color: getContrastText(palette.grey[300]),
      backgroundColor: palette.grey[300],
      boxShadow: shadows[2],
      '&$keyboardFocused': {
        boxShadow: shadows[6],
      },
      '&:hover': {
        backgroundColor: palette.grey.A100,
      },
      '&:active': {
        boxShadow: shadows[8],
      },
      '&$disabled': {
        boxShadow: shadows[0],
      },
    },
    keyboardFocused: {},
    raisedPrimary: {
      color: getContrastText(palette.primary[500]),
      backgroundColor: palette.primary[500],
      '&:hover': {
        backgroundColor: palette.primary[700],
      },
    },
    raisedAccent: {
      color: getContrastText(palette.accent.A200),
      backgroundColor: palette.accent.A200,
      '&:hover': {
        backgroundColor: palette.accent.A400,
      },
    },
    fab: {
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: shadows[6],
      '&:active': {
        boxShadow: shadows[12],
      },
    },
  };
});

/**
 * Buttons communicate the action that will occur when the user
 * touches them.
 *
 * ```jsx
 * <Button>Hello World</Button>
 * ```
 */
export default class Button extends Component {
  static propTypes = {
    /**
     * If `true`, the button will use the theme's accent color.
     */
    accent: PropTypes.bool,
    /**
     * The content of the button.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Uses a smaller minWidth, ideal for things like card actions.
     */
    compact: PropTypes.bool,
    /**
     * The element or component used for the root node.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * If `true`, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, well use floating action button styling.
     */
    fab: PropTypes.bool,
    /**
     * If `true`, the button will have a keyboard focus ripple.
     * Ripple must also be true.
     */
    focusRipple: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     * If set, an `a` element will be used as the root node.
     */
    href: PropTypes.string,
    /**
     * If `true`, the button will use the theme's primary color.
     */
    primary: PropTypes.bool,
    /**
     * If `true`, the button will use raised styling.
     */
    raised: PropTypes.bool,
    /**
     * If `true`, the button will have a ripple.
     */
    ripple: PropTypes.bool,
    /**
     * @ignore
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    accent: false,
    component: 'button',
    compact: false,
    disabled: false,
    fab: false,
    focusRipple: true,
    primary: false,
    raised: false,
    ripple: true,
    type: 'button',
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  render() {
    const {
      accent,
      children,
      className: classNameProp,
      compact,
      disabled,
      fab,
      primary,
      raised,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const flat = !raised && !fab;
    const className = classNames({
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.primary]: flat && primary,
      [classes.accent]: flat && accent,
      [classes.raisedPrimary]: !flat && primary,
      [classes.raisedAccent]: !flat && accent,
      [classes.compact]: compact,
      [classes.disabled]: disabled,
    }, classNameProp);

    return (
      <ButtonBase
        className={className}
        disabled={disabled}
        keyboardFocusedClassName={classes.keyboardFocused}
        {...other}
      >
        <span className={classes.label}>
          {children}
        </span>
      </ButtonBase>
    );
  }
}
