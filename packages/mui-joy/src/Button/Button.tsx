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
  name: 'JoyButton',
  slot: 'StartIcon',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: ButtonProps }>({
  '--Icon-margin': '0 0 0 calc(var(--Button-gap) / -2)',
  display: 'inherit',
  marginRight: 'var(--Button-gap)',
});

const ButtonEndIcon = styled('span', {
  name: 'JoyButton',
  slot: 'EndIcon',
  overridesResolver: (props, styles) => styles.endIcon,
})<{ ownerState: ButtonProps }>({
  '--Icon-margin': '0 calc(var(--Button-gap) / -2) 0 0',
  display: 'inherit',
  marginLeft: 'var(--Button-gap)',
});

export const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ButtonProps }>(({ theme, ownerState }) => {
  return [
    {
      '--Icon-margin': 'initial', // reset the icon's margin.
      ...(ownerState.size === 'sm' && {
        '--Icon-fontSize': '1.25rem',
        '--Button-gap': '0.375rem',
        minHeight: 'var(--Button-minHeight, 2rem)',
        fontSize: theme.vars.fontSize.sm,
        paddingBlock: '2px',
        paddingInline: '0.75rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Icon-fontSize': '1.5rem', // control the SvgIcon font-size
        '--Button-gap': '0.5rem',
        minHeight: 'var(--Button-minHeight, 2.5rem)', // use min-height instead of height to make the button resilient to its content
        fontSize: theme.vars.fontSize.sm,
        paddingBlock: '0.25rem', // the padding-block act as a minimum spacing between content and root element
        paddingInline: '1rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Icon-fontSize': '1.75rem',
        '--Button-gap': '0.75rem',
        minHeight: 'var(--Button-minHeight, 3rem)',
        fontSize: theme.vars.fontSize.md,
        paddingBlock: '0.375rem',
        paddingInline: '1.5rem',
      }),
      borderRadius: `var(--Button-radius, ${theme.vars.radius.sm})`, // to be controlled by other components, eg. Input
      margin: `var(--Button-margin)`, // to be controlled by other components, eg. Input
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textDecoration: 'none', // prevent user agent underline when used as anchor
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
      transition:
        'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontFamily: theme.vars.fontFamily.body,
      fontWeight: theme.vars.fontWeight.md,
      lineHeight: 1,
      ...(ownerState.fullWidth && {
        width: '100%',
      }),
      [theme.focus.selector]: theme.focus.default,
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
    { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
    {
      [`&.${buttonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyButton',
  });

  const {
    children,
    className,
    action,
    component = 'button',
    color = 'primary',
    variant = 'solid',
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
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
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
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Button;
