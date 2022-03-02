import * as React from 'react';

export interface FormControlUnstyledState {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
  value?: unknown;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  registerEffect?: () => void;
}

/**
 * @ignore - internal component.
 */
const FormControlUnstyledContext = React.createContext<FormControlUnstyledState | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  FormControlUnstyledContext.displayName = 'FormControlUnstyledContext';
}

export default FormControlUnstyledContext;
