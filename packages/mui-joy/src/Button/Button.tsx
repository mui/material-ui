import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { useButton } from '@mui/core/ButtonUnstyled';
import { styled } from '../styles';
import { ExtendButton, ButtonTypeMap } from './ButtonProps';

const ButtonRoot = styled('button', {
  name: 'JoyButton',
  slot: 'Root',
})(({ theme }) => ({
  '--joy-Button-minHeight': '40px',
  padding: '4px 16px',
  minHeight: 'var(--joy-Button-minHeight)',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = inProps;

  const { children, action, component = 'button', ...other } = props;

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
    focusVisible,
  };

  return (
    <ButtonRoot as={ComponentProp} {...other} {...getRootProps()}>
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
