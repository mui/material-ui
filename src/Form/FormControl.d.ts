import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface FormControlProps extends StandardProps<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  FormControlClassKey
> {
  component?: string | React.ComponentType<FormControlProps>;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  margin?: PropTypes.Margin;
  onBlur?: React.EventHandler<any>;
  onFocus?: React.EventHandler<any>;
  required?: boolean;
}

export type FormControlClassKey =
  | 'root'
  | 'marginNormal'
  | 'marginDense'
  | 'fullWidth'
  ;

declare const FormControl: React.ComponentType<FormControlProps>;

export default FormControl;
