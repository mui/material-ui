import * as React from 'react';
import type { FormControlProps } from './FormControl';

type ContextFromPropsKey =
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'margin'
  | 'required'
  | 'variant';

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  color: string;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
  regiterEffect: () => void;
  setAdornedStart: React.Dispatch<React.SetStateAction<boolean>>;
  size: string;
}

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export default FormControlContext;
