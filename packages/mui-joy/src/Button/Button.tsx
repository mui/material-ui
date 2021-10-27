import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/core/ButtonUnstyled';
import { styled } from '../styles';
import { ExtendButton, ButtonTypeMap, ButtonProps } from './ButtonProps';

const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
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
    },
    ownerState.variant === 'text' && {
      color: colorPalette[500],
      '&:hover': {
        backgroundColor: `rgba(${colorPalette.channel500} / 0.12)`,
      },
    },
    ownerState.variant === 'contained' && {
      backgroundColor: colorPalette[500],
      color: '#fff',
      '&:hover': {
        backgroundColor: colorPalette[600],
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
    action,
    component = 'button',
    color = 'brand',
    variant = 'text',
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
    variant,
  };

  return (
    <ButtonRoot as={ComponentProp} ownerState={ownerState} {...other} {...getRootProps()}>
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
