import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import fabClasses, { getFabUtilityClass } from './fabClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';

const useUtilityClasses = (ownerState) => {
  const { color, variant, classes, size } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `size${capitalize(size)}`,
      color === 'inherit' ? 'colorInherit' : color,
    ],
  };

  const composedClasses = composeClasses(slots, getFabUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const FabRoot = styled(ButtonBase, {
  name: 'MuiFab',
  slot: 'Root',
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      styles[capitalize(ownerState.size)],
      styles[ownerState.color],
    ];
  },
})(
  ({ theme, ownerState }) => ({
    ...theme.typography.button,
    minHeight: 36,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    zIndex: (theme.vars || theme).zIndex.fab,
    boxShadow: (theme.vars || theme).shadows[6],
    '&:active': {
      boxShadow: (theme.vars || theme).shadows[12],
    },
    color: theme.vars
      ? theme.vars.palette.text.primary
      : theme.palette.getContrastText?.(theme.palette.grey[300]),
    backgroundColor: (theme.vars || theme).palette.grey[300],
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.grey.A100,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.grey[300],
      },
      textDecoration: 'none',
    },
    [`&.${fabClasses.focusVisible}`]: {
      boxShadow: (theme.vars || theme).shadows[6],
    },
    ...(ownerState.size === 'small' && {
      width: 40,
      height: 40,
    }),
    ...(ownerState.size === 'medium' && {
      width: 48,
      height: 48,
    }),
    ...(ownerState.variant === 'extended' && {
      borderRadius: 48 / 2,
      padding: '0 16px',
      width: 'auto',
      minHeight: 'auto',
      minWidth: 48,
      height: 48,
    }),
    ...(ownerState.variant === 'extended' &&
      ownerState.size === 'small' && {
        width: 'auto',
        padding: '0 8px',
        borderRadius: 34 / 2,
        minWidth: 34,
        height: 34,
      }),
    ...(ownerState.variant === 'extended' &&
      ownerState.size === 'medium' && {
        width: 'auto',
        padding: '0 16px',
        borderRadius: 40 / 2,
        minWidth: 40,
        height: 40,
      }),
    ...(ownerState.color === 'inherit' && {
      color: 'inherit',
    }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.color !== 'inherit' &&
      ownerState.color !== 'default' &&
      (theme.vars || theme).palette[ownerState.color] != null && {
        color: (theme.vars || theme).palette[ownerState.color].contrastText,
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
          },
        },
      }),
  }),
  ({ theme }) => ({
    [`&.${fabClasses.disabled}`]: {
      color: (theme.vars || theme).palette.action.disabled,
      boxShadow: (theme.vars || theme).shadows[0],
      backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
    },
  }),
);

const Fab = React.forwardRef(function Fab(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFab' });
  const {
    children,
    className,
    color = 'default',
    component = 'button',
    disabled = false,
    disableFocusRipple = false,
    focusVisibleClassName,
    size = 'large',
    variant = 'circular',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableFocusRipple,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <FabRoot
      className={clsx(classes.root, className)}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ownerState={ownerState}
      ref={ref}
      {...other}
      classes={classes}
    >
      {children}
    </FabRoot>
  );
});

Fab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'default'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      'default',
      'error',
      'info',
      'inherit',
      'primary',
      'secondary',
      'success',
      'warning',
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'extended']),
    PropTypes.string,
  ]),
};

export default Fab;
