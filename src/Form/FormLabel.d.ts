import * as React from 'react';
import { StyledComponent } from '..';

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
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

declare const FormLabel: StyledComponent<FormLabelProps, FormLabelClassKey>;

export default FormLabel;
