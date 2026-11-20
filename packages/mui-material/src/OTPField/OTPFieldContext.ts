'use client';

import * as React from 'react';
import type { OTPFieldClasses } from './otpFieldClasses';
import type { OTPFieldProps, OTPFieldOwnerState } from './OTPField.types';

interface OTPFieldContextValue {
  autoFocus: OTPFieldProps['autoFocus'];
  inputRef: OTPFieldProps['inputRef'];
  getInputAriaLabel: NonNullable<OTPFieldProps['getInputAriaLabel']>;
  ariaLabel: string | undefined;
  labelledBy: string | undefined;
  describedBy: string | undefined;
  classes: Pick<OTPFieldClasses, 'input' | 'separator'>;
  ownerState: OTPFieldOwnerState;
}

// Base UI requires each OTPFieldInput to be inside an OTPField.
const OTPFieldContext = React.createContext<OTPFieldContextValue>(null!);

export const OTPFieldContextProvider = OTPFieldContext.Provider;

export function useOTPFieldContext() {
  return React.useContext(OTPFieldContext);
}
