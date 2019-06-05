import * as React from 'react';
import { StandardProps } from '..';

export interface FormHelperTextProps
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, FormHelperTextClassKey> {
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  component?: React.ElementType<React.HTMLAttributes<HTMLParagraphElement>>;
  margin?: 'dense';
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

export type FormHelperTextClassKey =
  | 'root'
  | 'error'
  | 'disabled'
  | 'marginDense'
  | 'focused'
  | 'filled'
  | 'contained'
  | 'required';

declare const FormHelperText: React.ComponentType<FormHelperTextProps>;

export default FormHelperText;
