import * as React from 'react';
import { StandardProps } from '..';

export interface FormLabelProps extends StandardProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  FormLabelClassKey
> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
}

export type FormLabelClassKey =
  | 'root'
  | 'focused'
  | 'error'
  | 'disabled'
  ;

declare const FormLabel: React.ComponentType<FormLabelProps>;

export default FormLabel;
