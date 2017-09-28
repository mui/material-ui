import * as React from 'react';
import { StyledComponent } from '..';

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  disabled?: boolean;
  error?: boolean;
  margin?: 'dense';
}

export type FormHelperTextClassKey =
  | 'root'
  | 'dense'
  | 'error'
  | 'disabled'
  ;

declare const FormHelperText: StyledComponent<FormHelperTextProps, FormHelperTextClassKey>;

export default FormHelperText;
