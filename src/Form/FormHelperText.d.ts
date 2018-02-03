import * as React from 'react';
import { StandardProps } from '..';

export interface FormHelperTextProps
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, FormHelperTextClassKey> {
  disabled?: boolean;
  error?: boolean;
  margin?: 'dense';
}

export type FormHelperTextClassKey = 'root' | 'dense' | 'error' | 'disabled';

declare const FormHelperText: React.ComponentType<FormHelperTextProps>;

export default FormHelperText;
