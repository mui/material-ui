import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface FormControlProps<C>
  extends StandardProps<React.HtmlHTMLAttributes<HTMLDivElement>, FormControlClassKey> {
  component?: React.ReactType<C>;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  margin?: PropTypes.Margin;
  onBlur?: React.EventHandler<any>;
  onFocus?: React.EventHandler<any>;
  required?: boolean;
}

export type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

declare class FormControl<C> extends React.Component<C & FormControlProps<C>> {}

export default FormControl;
