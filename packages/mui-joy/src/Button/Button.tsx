import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/core/ButtonUnstyled';
import composeClasses from '@mui/core/composeClasses';
import { styled } from '../styles';
import { ExtendButton, ButtonTypeMap, ButtonProps } from './ButtonProps';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';

const useUtilityClasses = (ownerState: ButtonProps & { focusVisible: boolean }) => {
  const {
    classes,
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
  } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant,
      `${variant}${capitalize(color!)}`,
      `size${capitalize(size!)}`,
      `${variant}Size${capitalize(size!)}`,
      fullWidth && 'fullWidth',
    ],
    startIcon: ['startIcon'],
    endIcon: ['endIcon'],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      styles[`${ownerState.variant}Size${capitalize(ownerState.size)}`],
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})<{ ownerState: ButtonProps }>(({ theme, ownerState }) => {
  const colorPalette = theme.vars.palette[ownerState.color || 'brand'];
  return [
    {
      padding: '4px 16px',
      minHeight: '40px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ...theme.typography.body(theme),
      [`&.${buttonClasses.focusVisible}`]: {
        outline: '2px solid',
        outlineColor: colorPalette[300],
        outlineOffset: '2px',
      },
    },
    ownerState.variant === 'text' && {
      color: colorPalette[500],
      '&:hover': {
        backgroundColor: `rgba(${colorPalette.channel500} / 0.12)`,
      },
      '&:active': {
        backgroundColor: `rgba(${colorPalette.channel500} / 0.2)`,
      },
    },
    ownerState.variant === 'contained' && {
      backgroundColor: colorPalette[500],
      color: '#fff',
      '&:hover': {
        backgroundColor: colorPalette[600],
      },
      '&:active': {
        backgroundColor: colorPalette[700],
      },
    },
    ownerState.variant === 'outlined' && {
      color: colorPalette[500],
      border: '1px solid',
      borderColor: `rgba(${colorPalette.channel500} / 0.6)`,
      '&:hover': {
        borderColor: colorPalette[500],
        backgroundColor: `rgba(${colorPalette.channel500} / 0.12)`,
      },
      '&:active': {
        backgroundColor: `rgba(${colorPalette.channel500} / 0.2)`,
      },
    },
    ownerState.size === 'small' && {
      fontSize: '0.875rem',
      minHeight: '32px',
      padding: '4px 12px',
    },
    ownerState.size === 'large' && {
      minHeight: '48px',
      fontSize: '1.125rem',
      padding: '4px 20px',
    },
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = inProps;

  const {
    children,
    className,
    action,
    component = 'button',
    color = 'brand',
    variant = 'text',
    size = 'medium',
    startIcon,
    endIcon,
    ...other
  } = props;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const ComponentProp = component;

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    component: ComponentProp,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible],
  );

  const ownerState = {
    ...props,
    color,
    component,
    focusVisible,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ButtonRoot
      as={ComponentProp}
      className={clsx(
        classes.root,
        startIcon && classes.startIcon,
        endIcon && classes.endIcon,
        className,
      )}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {children}
    </ButtonRoot>
  );
}) as ExtendButton<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default Button;
