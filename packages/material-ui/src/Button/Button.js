import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';

const useUtilityClasses = (ownerState) => {
  const { color, disableElevation, fullWidth, size, variant, classes } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      `${variant}${capitalize(color)}`,
      `size${capitalize(size)}`,
      `${variant}Size${capitalize(size)}`,
      color === 'inherit' && 'colorInherit',
      disableElevation && 'disableElevation',
      fullWidth && 'fullWidth',
    ],
    label: ['label'],
    startIcon: ['startIcon', `iconSize${capitalize(size)}`],
    endIcon: ['endIcon', `iconSize${capitalize(size)}`],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the ButtonBase
    ...composedClasses,
  };
};

const commonIconStyles = (ownerState) => ({
  ...(ownerState.size === 'small' && {
    '& > *:nth-of-type(1)': {
      fontSize: 18,
    },
  }),
  ...(ownerState.size === 'medium' && {
    '& > *:nth-of-type(1)': {
      fontSize: 20,
    },
  }),
  ...(ownerState.size === 'large' && {
    '& > *:nth-of-type(1)': {
      fontSize: 22,
    },
  }),
});

const ButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`],
      ownerState.color === 'inherit' && styles.colorInherit,
      ownerState.disableElevation && styles.disableElevation,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})(
  ({ theme, ownerState }) => ({
    ...theme.typography.button,
    minWidth: 64,
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(
      ['background-color', 'box-shadow', 'border-color', 'color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      ...(ownerState.variant === 'text' &&
        ownerState.color !== 'inherit' && {
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        }),
      ...(ownerState.variant === 'outlined' &&
        ownerState.color !== 'inherit' && {
          border: `1px solid ${theme.palette[ownerState.color].main}`,
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        }),
      ...(ownerState.variant === 'contained' && {
        backgroundColor: theme.palette.grey.A100,
        boxShadow: theme.shadows[4],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.grey[300],
        },
      }),
      ...(ownerState.variant === 'contained' &&
        ownerState.color !== 'inherit' && {
          backgroundColor: theme.palette[ownerState.color].dark,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: theme.palette[ownerState.color].main,
          },
        }),
    },
    '&:active': {
      ...(ownerState.variant === 'contained' && {
        boxShadow: theme.shadows[8],
      }),
    },
    [`&.${buttonClasses.focusVisible}`]: {
      ...(ownerState.variant === 'contained' && {
        boxShadow: theme.shadows[6],
      }),
    },
    [`&.${buttonClasses.disabled}`]: {
      color: theme.palette.action.disabled,
      ...(ownerState.variant === 'outlined' && {
        border: `1px solid ${theme.palette.action.disabledBackground}`,
      }),
      ...(ownerState.variant === 'outlined' &&
        ownerState.color === 'secondary' && {
          border: `1px solid ${theme.palette.action.disabled}`,
        }),
      ...(ownerState.variant === 'contained' && {
        color: theme.palette.action.disabled,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.action.disabledBackground,
      }),
    },
    ...(ownerState.variant === 'text' && {
      padding: '6px 8px',
    }),
    ...(ownerState.variant === 'text' &&
      ownerState.color !== 'inherit' && {
        color: theme.palette[ownerState.color].main,
      }),
    ...(ownerState.variant === 'outlined' && {
      padding: '5px 15px',
      border: `1px solid ${
        theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
      }`,
    }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.color !== 'inherit' && {
        color: theme.palette[ownerState.color].main,
        border: `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`,
      }),
    ...(ownerState.variant === 'contained' && {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
      boxShadow: theme.shadows[2],
    }),
    ...(ownerState.variant === 'contained' &&
      ownerState.color !== 'inherit' && {
        color: theme.palette[ownerState.color].contrastText,
        backgroundColor: theme.palette[ownerState.color].main,
      }),
    ...(ownerState.color === 'inherit' && {
      color: 'inherit',
      borderColor: 'currentColor',
    }),
    ...(ownerState.size === 'small' &&
      ownerState.variant === 'text' && {
        padding: '4px 5px',
        fontSize: theme.typography.pxToRem(13),
      }),
    ...(ownerState.size === 'large' &&
      ownerState.variant === 'text' && {
        padding: '8px 11px',
        fontSize: theme.typography.pxToRem(15),
      }),
    ...(ownerState.size === 'small' &&
      ownerState.variant === 'outlined' && {
        padding: '3px 9px',
        fontSize: theme.typography.pxToRem(13),
      }),
    ...(ownerState.size === 'large' &&
      ownerState.variant === 'outlined' && {
        padding: '7px 21px',
        fontSize: theme.typography.pxToRem(15),
      }),
    ...(ownerState.size === 'small' &&
      ownerState.variant === 'contained' && {
        padding: '4px 10px',
        fontSize: theme.typography.pxToRem(13),
      }),
    ...(ownerState.size === 'large' &&
      ownerState.variant === 'contained' && {
        padding: '8px 22px',
        fontSize: theme.typography.pxToRem(15),
      }),
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
  }),
  ({ ownerState }) =>
    ownerState.disableElevation && {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      [`&.${buttonClasses.focusVisible}`]: {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
      [`&.${buttonClasses.disabled}`]: {
        boxShadow: 'none',
      },
    },
);

const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.startIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})(({ ownerState }) => ({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4,
  ...(ownerState.size === 'small' && {
    marginLeft: -2,
  }),
  ...commonIconStyles(ownerState),
}));

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.endIcon, styles[`iconSize${capitalize(ownerState.size)}`]];
  },
})(({ ownerState }) => ({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8,
  ...(ownerState.size === 'small' && {
    marginRight: -2,
  }),
  ...commonIconStyles(ownerState),
}));

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiButton' });
  const {
    children,
    color = 'primary',
    component = 'button',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const startIcon = startIconProp && (
    <ButtonStartIcon className={classes.startIcon} ownerState={ownerState}>
      {startIconProp}
    </ButtonStartIcon>
  );

  const endIcon = endIconProp && (
    <ButtonEndIcon className={classes.endIcon} ownerState={ownerState}>
      {endIconProp}
    </ButtonEndIcon>
  );

  return (
    <ButtonRoot
      ownerState={ownerState}
      component={component}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      ref={ref}
      type={type}
      {...other}
      classes={classes}
    >
      {startIcon}
      {children}
      {endIcon}
    </ButtonRoot>
  );
});

Button.propTypes /* remove-proptypes */ = {
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
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
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
};

export default Button;
