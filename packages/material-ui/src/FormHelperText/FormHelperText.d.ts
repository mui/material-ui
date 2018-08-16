import * as React from 'react';
import { StandardProps } from '..';

export interface FormHelperTextProps
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, FormHelperTextClassKey> {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  component?: React.ReactType<FormHelperTextProps>;
  margin?: 'dense';
  required?: boolean;
}

export type FormHelperTextClassKey =
  | 'root'
  | 'error'
  | 'disabled'
  | 'marginDense'
  | 'focused'
  | 'filled'
  | 'required';

declare const FormHelperText: React.ComponentType<FormHelperTextProps>;

export default FormHelperText;
