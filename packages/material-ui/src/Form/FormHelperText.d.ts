import * as React from 'react';
import { StandardProps } from '..';

export interface FormHelperTextProps
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, FormHelperTextClassKey> {
  disabled?: boolean;
  error?: boolean;
  component?: React.ReactType<FormHelperTextProps>;
  margin?: 'dense';
}

export type FormHelperTextClassKey = 'root' | 'error' | 'disabled' | 'marginDense';

declare const FormHelperText: React.ComponentType<FormHelperTextProps>;

export default FormHelperText;
