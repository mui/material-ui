import * as React from 'react';
import { FormControlProps } from './FormControl.types';

type ContextFromPropsKey =
  | 'color'
  | 'disabled'
  | 'error'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'margin'
  | 'required'
  | 'size'
  | 'variant';

export interface FormControlContextValue extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onEmpty: () => void;
  onFilled: () => void;
  registerEffect: undefined | (() => () => void);
  setAdornedStart: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @internal
 */
const FormControlContext = React.createContext<FormControlContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export default FormControlContext;
