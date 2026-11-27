'use client';

import type * as React from 'react';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import { useRender } from '@base-ui/react/use-render';
import type { OTPFieldOwnerState } from '../OTPField/OTPField.types';
import { styled } from '../zero-styled';

interface OTPFieldInputElementProps {
  className?: string | undefined;
  inputProps: React.ComponentPropsWithRef<'input'>;
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  render: BaseOTPField.Input.Props['render'];
  state: BaseOTPField.Input.State;
}

/** @ignore - internal component. */
function InputElement({
  className,
  inputProps,
  inputRef,
  render,
  state,
}: OTPFieldInputElementProps) {
  // useRender attaches Base UI's input ref, the field's inputRef, and any ref on the render element.
  return useRender({
    defaultTagName: 'input',
    render: typeof render === 'function' ? (props) => render(props, state) : render,
    props: { ...inputProps, className },
    ref: inputRef,
  });
}

const OTPFieldInputElement = styled(InputElement, { name: 'MuiOTPField', slot: 'Input' })<{
  ownerState: OTPFieldOwnerState;
}>(({ theme, ownerState }) => {
  const { palette, shape } = theme.vars || theme;
  const small = ownerState.size === 'small';

  return {
    ...theme.typography.body1,
    boxSizing: 'border-box',
    width: theme.spacing(small ? 5 : 6),
    flex: ownerState.fullWidth ? '1 1 0' : undefined,
    minWidth: 0,
    height: theme.spacing(small ? 5 : 7),
    padding: 0,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    color: palette.text.primary,
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: ownerState.error ? palette.error.main : palette.text.secondary,
    borderRadius: shape.borderRadius,
    '&:focus': {
      outline: '2px solid',
      outlineColor:
        palette[ownerState.error ? 'error' : ownerState.color]?.main ?? palette.primary.main,
      outlineOffset: -2,
    },
    '&:disabled': {
      color: palette.text.disabled,
      borderColor: palette.action.disabled,
    },
  };
});

export default OTPFieldInputElement;
