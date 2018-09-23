import * as React from 'react';
import { StandardProps } from '..';

export interface FormLabelProps extends StandardProps<FormLabelBaseProps, FormLabelClassKey> {
  component?: React.ReactType<FormLabelBaseProps>;
  disabled?: boolean;
  error?: boolean;
  filled?: boolean;
  focused?: boolean;
  required?: boolean;
}

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelClassKey =
  | 'root'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'filled'
  | 'required'
  | 'asterisk';

declare const FormLabel: React.ComponentType<FormLabelProps>;

export default FormLabel;
