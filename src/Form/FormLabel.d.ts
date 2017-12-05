import * as React from 'react';
import { StandardProps } from '..';

export interface FormLabelProps extends StandardProps<
  FormLabelBaseProps,
  FormLabelClassKey
> {
  component?: string | React.ComponentType<FormLabelBaseProps>;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
}

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelClassKey =
  | 'root'
  | 'focused'
  | 'error'
  | 'disabled'
  ;

declare const FormLabel: React.ComponentType<FormLabelProps>;

export default FormLabel;
