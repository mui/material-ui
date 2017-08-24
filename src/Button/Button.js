// @flow
// @inheritedComponent ButtonBase

import React from 'react';
import type { ComponentType, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';

export const styles = (theme: Object) => ({
  root: {
    ...theme.typography.button,
    lineHeight: '1em',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: 88,
    minHeight: 36,
    padding: `11px ${theme.spacing.unit * 2}px`,
    borderRadius: 2,
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.text.primary, 0.12),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
  dense: {
    padding: `10px ${theme.spacing.unit}px`,
    minWidth: 64,
    minHeight: 32,
    fontSize: theme.typography.fontSize - 1,
  },
  label: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
  flatPrimary: {
    color: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: fade(theme.palette.primary[500], 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  flatAccent: {
    color: theme.palette.secondary.A200,
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.A200, 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  flatContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    '&:hover': {
      backgroundColor: fade(theme.palette.getContrastText(theme.palette.primary[500]), 0.12),
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  colorInherit: {
    color: 'inherit',
  },
  raised: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
    '&$keyboardFocused': {
      boxShadow: theme.shadows[6],
    },
    '&:active': {
      boxShadow: theme.shadows[8],
    },
    '&$disabled': {
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.text.divider,
    },
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
      '&$disabled': {
        backgroundColor: theme.palette.text.divider,
        // Reset on mouse devices
        '@media (hover: none)': {
          backgroundColor: theme.palette.grey[300],
        },
      },
    },
  },
  keyboardFocused: {},
  raisedPrimary: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    backgroundColor: theme.palette.primary[500],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: theme.palette.primary[500],
      },
    },
  },
  raisedAccent: {
    color: theme.palette.getContrastText(theme.palette.secondary.A200),
    backgroundColor: theme.palette.secondary.A200,
    '&:hover': {
      backgroundColor: theme.palette.secondary.A400,
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: theme.palette.secondary.A200,
      },
    },
  },
  raisedContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
    '&:active': {
      boxShadow: theme.shadows[12],
    },
  },
});

type DefaultProps = {
  classes: Object,
  color: 'default',
  dense: boolean,
  disabled: boolean,
  fab: boolean,
  disableFocusRipple: boolean,
  raised: boolean,
  disableRipple: boolean,
  type: 'button',
};

export type Props = {
  /**
   * The content of the button.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color?: 'default' | 'inherit' | 'primary' | 'accent' | 'contrast',
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component?: string | ComponentType<*>,
  /**
   * Uses a smaller minWidth, ideal for things like card actions.
   */
  dense?: boolean,
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple?: boolean,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * If `true`, well use floating action button styling.
   */
  fab?: boolean,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href?: string,
  /**
   * If `true`, the button will use raised styling.
   */
  raised?: boolean,
  /**
   * @ignore
   */
  type?: string,
};

type AllProps = DefaultProps & Props;

function Button(props: AllProps) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    dense,
    disabled,
    disableFocusRipple,
    fab,
    raised,
    ...other
  } = props;

  const flat = !raised && !fab;
  const className = classNames(
    {
      [classes.root]: true,
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.colorInherit]: color === 'inherit',
      [classes.flatPrimary]: flat && color === 'primary',
      [classes.flatAccent]: flat && color === 'accent',
      [classes.flatContrast]: flat && color === 'contrast',
      [classes.raisedPrimary]: !flat && color === 'primary',
      [classes.raisedAccent]: !flat && color === 'accent',
      [classes.raisedContrast]: !flat && color === 'contrast',
      [classes.dense]: dense,
      [classes.disabled]: disabled,
    },
    classNameProp,
  );

  return (
    <ButtonBase
      className={className}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      keyboardFocusedClassName={classes.keyboardFocused}
      {...other}
    >
      <span className={classes.label}>
        {children}
      </span>
    </ButtonBase>
  );
}

Button.defaultProps = {
  color: 'default',
  dense: false,
  disabled: false,
  fab: false,
  disableFocusRipple: false,
  raised: false,
  disableRipple: false,
  type: 'button',
};

export default withStyles(styles, { name: 'MuiButton' })(Button);
