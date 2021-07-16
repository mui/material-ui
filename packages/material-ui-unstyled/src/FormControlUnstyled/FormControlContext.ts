import * as React from 'react';
import { FormControlUnstyledProps } from './FormControlUnstyledProps';

type ContextFromPropsKey =
  | 'defaultValue'
  | 'disabled'
  | 'error'
  | 'onChange'
  | 'required'
  | 'value';

export interface FormControlState extends Pick<FormControlUnstyledProps, ContextFromPropsKey> {
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onFocus: () => void;
  registerEffect: () => void;
}

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export default FormControlContext;
