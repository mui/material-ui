import * as React from 'react';
import type { FormControlProps } from './FormControl';

type ContextFromPropsKey =
  | 'color'
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'margin'
  | 'onBlur'
  | 'onFocus'
  | 'required'
  | 'size'
  | 'variant';

export interface FormControlState extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onEmpty: () => void;
  onFilled: () => void;
  registerEffect: () => void;
  setAdornedStart: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext<FormControlState | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export default FormControlContext;
