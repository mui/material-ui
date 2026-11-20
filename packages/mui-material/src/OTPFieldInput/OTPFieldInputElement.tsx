'use client';

import * as React from 'react';
import clsx from 'clsx';
import type { OTPField as BaseOTPField } from '@base-ui/react/otp-field';
import useForkRef from '@mui/utils/useForkRef';
import { styled } from '../zero-styled';
import { useOTPFieldContext } from '../OTPField/OTPFieldContext';
import type { OTPFieldOwnerState } from '../OTPField/OTPField.types';
import type { OTPFieldInputProps } from './OTPFieldInput';

const OTPFieldInputRoot = styled('input', { name: 'MuiOTPField', slot: 'Input' })<{
  ownerState: OTPFieldOwnerState;
}>(({ theme, ownerState }) => {
  const { palette, shape } = theme.vars || theme;
  const small = ownerState.size === 'small';

  return {
    ...theme.typography.body1,
    boxSizing: 'border-box',
    width: theme.spacing(small ? 5 : 6),
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
      outlineColor: ownerState.error ? palette.error.main : palette.primary.main,
      outlineOffset: -2,
    },
    '&:disabled': {
      color: palette.text.disabled,
      borderColor: palette.action.disabled,
    },
  };
});

/** @ignore - internal component. */
function OTPFieldInputElement({
  inputProps,
  state,
  sx,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
}: {
  inputProps: React.ComponentPropsWithRef<'input'>;
  state: BaseOTPField.Input.State;
  sx: OTPFieldInputProps['sx'];
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
}) {
  const field = useOTPFieldContext();
  const first = state.index === 0;
  const ref = useForkRef(inputProps.ref, first ? field.inputRef : undefined);
  const label =
    ariaLabel ?? (first ? field.ariaLabel : field.getInputAriaLabel(state.index + 1, state.length));
  const labelledBy = ariaLabelledBy ?? (first ? field.labelledBy : undefined);

  return (
    <OTPFieldInputRoot
      {...inputProps}
      ref={ref}
      sx={sx}
      ownerState={field.ownerState}
      className={clsx(field.classes.input, inputProps.className)}
      autoFocus={inputProps.autoFocus ?? (first && field.autoFocus)}
      aria-label={label}
      aria-labelledby={labelledBy ?? (label ? undefined : inputProps['aria-labelledby'])}
      aria-describedby={[field.describedBy, ariaDescribedBy].filter(Boolean).join(' ') || undefined}
      aria-invalid={field.ownerState.error && !state.disabled ? true : inputProps['aria-invalid']}
    />
  );
}

export default OTPFieldInputElement;
