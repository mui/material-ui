import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface FormControlProps extends StandardProps<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  FormControlClassKey
> {
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  margin?: PropTypes.Margin;
  onBlur?: React.EventHandler<any>;
  onFocus?: React.EventHandler<any>;
  required?: boolean;
  component?: React.ReactType;
}

export type FormControlClassKey =
  | 'root'
  | 'marginNormal'
  | 'marginDense'
  | 'fullWidth'
  ;

declare const FormControl: React.ComponentType<FormControlProps>;

export default FormControl;
