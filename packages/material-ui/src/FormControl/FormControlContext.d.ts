import { Context } from 'react';
import { FormControlProps } from './FormControl';

type ContextFromPropsKey = 'disabled' | 'error' | 'margin' | 'required' | 'variant';

export interface FormControlContextProps extends Pick<FormControlProps, ContextFromPropsKey> {
  adornedStart: boolean;
  filled: boolean;
  focused: boolean;
  onBlur: () => void;
  onEmpty: () => void;
  onFilled: () => void;
  onFocus: () => void;
}

declare const FormControlContext: Context<FormControlContextProps | null | undefined>;

export default FormControlContext;
