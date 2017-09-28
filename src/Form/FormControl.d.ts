import * as React from 'react';
import { StyledComponent, PropTypes } from '..';

export interface FormControlProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
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

declare const FormControl: StyledComponent<FormControlProps, FormControlClassKey>;

export default FormControl;
