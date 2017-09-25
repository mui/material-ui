import * as React from 'react';
import { StyledComponent } from '..';

export interface FormLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
}

declare const FormLabel: StyledComponent<FormLabelProps>;

export default FormLabel;
