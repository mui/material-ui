import * as React from 'react';
import FormControlUnstyledProps from './FormControlUnstyledProps';

type ContextFromPropsKey =
  | 'defaultValue'
  | 'disabled'
  | 'error'
  | 'onChange'
  | 'required'
  | 'value';

export interface FormControlUnstyledState extends Pick<FormControlUnstyledProps, ContextFromPropsKey> {
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onFocus: () => void;
  registerEffect: () => void;
}

/**
 * @ignore - internal component.
 */
const FormControlUnstyledContext = React.createContext<FormControlUnstyledState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlUnstyledContext.displayName = 'FormControlUnstyledContext';
}

export default FormControlUnstyledContext;
