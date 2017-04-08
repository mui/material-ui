// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../internal/ButtonBase';

export const styleSheet = createStyleSheet('MuiButton', (theme) => {
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
      boxSizing: 'border-box',
      minWidth: 88,
      height: 36,
      padding: '0px 16px',
      borderRadius: 2,
      color: palette.text.primary,
      backgroundColor: 'transparent',
      transition: transitions.create(['background-color', 'box-shadow'], {
        duration: transitions.duration.short,
      }),
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: fade(palette.text.primary, 0.12),
        '&$disabled': {
          backgroundColor: 'transparent',
        },
      },
    },
    compact: {
      padding: '0 8px',
      minWidth: 64,
    },
    label: {
      width: '100%',
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
    },
    primary: {
      color: palette.primary[500],
      '&:hover': {
        backgroundColor: fade(palette.primary[500], 0.12),
      },
    },
    accent: {
      color: palette.accent.A200,
      '&:hover': {
        backgroundColor: fade(palette.accent.A200, 0.12),
      },
    },
    contrast: {
      color: palette.getContrastText(palette.primary[500]),
      '&:hover': {
        backgroundColor: fade(palette.getContrastText(palette.primary[500]), 0.12),
      },
    },
    raised: {
      color: palette.getContrastText(palette.grey[300]),
      backgroundColor: palette.grey[300],
      boxShadow: shadows[2],
      '&$keyboardFocused': {
        boxShadow: shadows[6],
      },
      '&:active': {
        boxShadow: shadows[8],
      },
      '&$disabled': {
        boxShadow: shadows[0],
        backgroundColor: palette.text.divider,
      },
      '&:hover': {
        backgroundColor: palette.grey.A100,
        '&$disabled': {
          backgroundColor: palette.text.divider,
        },
      },
    },
    keyboardFocused: {},
    raisedPrimary: {
      color: palette.getContrastText(palette.primary[500]),
      backgroundColor: palette.primary[500],
      '&:hover': {
        backgroundColor: palette.primary[700],
      },
    },
    raisedAccent: {
      color: palette.getContrastText(palette.accent.A200),
      backgroundColor: palette.accent.A200,
      '&:hover': {
        backgroundColor: palette.accent.A400,
      },
    },
    raisedContrast: {
      color: palette.getContrastText(palette.primary[500]),
    },
    disabled: {
      color: palette.action.disabled,
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
    children: PropTypes.node.isRequired,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Uses a smaller minWidth, ideal for things like card actions.
     */
    compact: PropTypes.bool,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
    /**
     * If `true`, the button will use the theme's contrast color.
     */
    contrast: PropTypes.bool,
    /**
     * If `true`, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, the  keyboard focus ripple will be disabled.
     * `ripple` must also be true.
     */
    disableFocusRipple: PropTypes.bool,
    /**
     * If `true`, the ripple effect will be disabled.
     */
    disableRipple: PropTypes.bool,
    /**
     * If `true`, well use floating action button styling.
     */
    fab: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     * If defined, an `a` element will be used as the root node.
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
     * @ignore
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    accent: false,
    component: 'button',
    compact: false,
    contrast: false,
    disabled: false,
    fab: false,
    disableFocusRipple: false,
    primary: false,
    raised: false,
    disableRipple: false,
    type: 'button',
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  render() {
    const {
      accent,
      children,
      className: classNameProp,
      compact,
      contrast,
      disabled,
      disableFocusRipple,
      disableRipple,
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
      [classes.contrast]: flat && contrast,
      [classes.raisedPrimary]: !flat && primary,
      [classes.raisedAccent]: !flat && accent,
      [classes.raisedContrast]: !flat && contrast,
      [classes.compact]: compact,
      [classes.disabled]: disabled,
    }, classNameProp);

    return (
      <ButtonBase
        className={className}
        disabled={disabled}
        focusRipple={!disableFocusRipple}
        ripple={!disableRipple}
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
