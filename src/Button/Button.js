// @inheritedComponent ButtonBase

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { fade } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';

export const styles = theme => ({
  root: {
    ...theme.typography.button,
    lineHeight: '1.4em', // Improve readability for multiline button.
    boxSizing: 'border-box',
    minWidth: 88,
    minHeight: 36,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderRadius: 2,
    color: theme.palette.text.primary,
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
    padding: `${theme.spacing.unit - 1}px ${theme.spacing.unit}px`,
    minWidth: 64,
    minHeight: 32,
    fontSize: theme.typography.pxToRem(theme.typography.fontSize - 1),
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
  mini: {
    width: 40,
    height: 40,
  },
});

function Button(props) {
  const {
    children,
    classes,
    className: classNameProp,
    color,
    dense,
    disabled,
    disableFocusRipple,
    fab,
    mini,
    raised,
    ...other
  } = props;

  const flat = !raised && !fab;
  const className = classNames(
    classes.root,
    {
      [classes.raised]: raised || fab,
      [classes.fab]: fab,
      [classes.mini]: fab && mini,
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
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
}

Button.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It's using the theme palette when that makes sense.
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'accent', 'contrast']),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Uses a smaller minWidth, ideal for things like card actions.
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   * `disableRipple` must also be true.
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, will use floating action button styling.
   */
  fab: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * If `true`, and `fab` is `true`, will use mini floating action button styling.
   */
  mini: PropTypes.bool,
  /**
   * If `true`, the button will use raised styling.
   */
  raised: PropTypes.bool,
  /**
   * @ignore
   */
  type: PropTypes.string,
};

Button.defaultProps = {
  color: 'default',
  dense: false,
  disabled: false,
  disableFocusRipple: false,
  disableRipple: false,
  fab: false,
  mini: false,
  raised: false,
  type: 'button',
};

export default withStyles(styles, { name: 'MuiButton' })(Button);
