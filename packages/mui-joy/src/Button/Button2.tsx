import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/core/ButtonUnstyled';
import composeClasses from '@mui/core/composeClasses';
import { styled, useThemeProps } from '../styles';
import { rootShouldForwardProp } from '../styles/styled';
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
      fullWidth && 'fullWidth',
      `variant${capitalize(variant!)}`,
      `color${capitalize(color!)}`,
      `size${capitalize(size!)}`,
    ],
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
      styles[`variant${capitalize(ownerState.variant)}`],
      styles[`color${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
  shouldForwardProp: rootShouldForwardProp,
})<{ ownerState: ButtonProps }>(({ theme, ownerState }) => {
  const colorPalette = theme.vars.palette[ownerState.color || 'brand'];
  return [
    {
      padding: '0.25rem 2rem',
      minHeight: '48px',
      borderRadius: '28px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ...theme.typography.button,
      [`&.${buttonClasses.disabled}`]: {
        pointerEvents: 'none',
        cursor: 'default',
        opacity: theme.vars.opacity.disabled,
      },
      [`&.${buttonClasses.focusVisible}`]: {
        outline: '4px solid',
        outlineColor: `rgba(${colorPalette.btnChannelTextOutline} / ${theme.vars.opacity.focus})`,
      },
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
    },
    ownerState.size === 'small' && {
      minHeight: '40px',
    },
    ownerState.size === 'large' && {
      minHeight: '56px',
    },
    (ownerState.variant === 'text' || ownerState.variant === 'outlined') && {
      color: colorPalette.btnTextColor,
      '&:hover': {
        backgroundColor: `rgba(${colorPalette.btnChannelTextBg} / ${theme.vars.opacity.hover})`,
      },
      '&:active': {
        backgroundColor: `rgba(${colorPalette.btnChannelTextBg} / ${theme.vars.opacity.active})`,
      },
    },
    ownerState.variant === 'outlined' && {
      border: '1px solid',
      borderColor: colorPalette.btnOutlinedBorder,
    },
    ownerState.variant === 'contained' && {
      color: colorPalette.btnContainedColor,
      backgroundColor: `rgba(${colorPalette.btnChannelContainedBg} / 1)`,
      '&:hover': {
        backgroundColor: `rgba(${colorPalette.btnChannelContainedBg} / ${theme.vars.opacity.hover})`,
      },
      '&:active': {
        backgroundColor: `rgba(${colorPalette.btnChannelContainedBg} / ${theme.vars.opacity.active})`,
      },
    },
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'JoyButton' });

  const {
    children,
    className,
    action,
    component = 'button',
    color = 'brand',
    variant = 'text',
    size = 'medium',
    fullWidth = false,
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
    component,
    color,
    fullWidth,
    variant,
    size,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ButtonRoot
      as={ComponentProp}
      className={clsx(classes.root, className)}
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
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['brand', 'neutral']),
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
} as any;

export default Button;
