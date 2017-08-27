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
}

export default class FormControl extends StyledComponent<FormControlProps> {}
