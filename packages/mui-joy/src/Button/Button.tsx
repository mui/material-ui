import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/base/ButtonUnstyled';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ExtendButton, ButtonTypeMap, ButtonProps } from './ButtonProps';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';

const useUtilityClasses = (ownerState: ButtonProps & { focusVisible: boolean }) => {
  const { color, disabled, focusVisible, focusVisibleClassName, fullWidth, size, variant } =
    ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    startIcon: ['startIcon'],
    endIcon: ['endIcon'],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonStartIcon = styled('span', {
  name: 'MuiButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: ButtonProps }>({
  display: 'inherit',
  marginLeft: 'calc(var(--Button-gutter) * var(--Button-iconOffsetStep) * -0.25)',
  marginRight: 'var(--Button-gap)',
});

const ButtonEndIcon = styled('span', {
  name: 'MuiButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => styles.endIcon,
})<{ ownerState: ButtonProps }>({
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
  marginRight: 'calc(var(--Button-gutter) * var(--Button-iconOffsetStep) * -0.25)',
});

const ButtonRoot = styled('button', {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonProps }>(({ theme, ownerState }) => {
  return [
    {
      '--Button-minHeight': '2.5rem', // use min-height instead of height to make the button resilient to its content
      '--Button-gutter': '1.5rem', // gutter is the padding-x
      '--Button-iconOffsetStep': 2, // negative margin of the start/end icon
      '--Button-gap': 'clamp(0.25rem, var(--Button-gutter) * 0.5, 0.5rem)', // gap between start/end icon and content [0.25rem, x, 0.5rem]
      ...(ownerState.size === 'sm' && {
        '--Button-minHeight': '2rem',
        '--Button-gutter': '1rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Button-minHeight': '3rem',
        '--Button-gutter': '2rem',
      }),
    },
    {
      padding: '0.25rem var(--Button-gutter)', // the padding-top, bottom act as a minimum spacing between content and root element
      ...(ownerState.variant === 'outlined' && {
        padding: 'calc(0.25rem - 1px) calc(var(--Button-gutter) - 1px)', // account for the border width
      }),
      minHeight: 'var(--Button-minHeight)',
      borderRadius: theme.vars.radius.sm,
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      ...theme.typography.body1,
      ...(ownerState.size === 'sm' && {
        ...theme.typography.body2,
        lineHeight: '1.25rem',
      }),
      ...(ownerState.size === 'lg' && theme.typography.h6),
      [`&.${buttonClasses.focusVisible}`]: theme.focus.default,
    },
    ownerState.fullWidth && {
      width: '100%',
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiButton',
  });

  const {
    children,
    className,
    action,
    component = 'button',
    color = 'primary',
    variant = 'contained',
    size = 'md',
    fullWidth = false,
    startIcon: startIconProp,
    endIcon: endIconProp,
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
      as={ComponentProp}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {startIcon}
      {children}
      {endIcon}
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
  color: PropTypes.oneOf(['context', 'danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default Button;
