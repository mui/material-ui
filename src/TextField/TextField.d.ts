import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';

export type TextFieldProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  helperTextClassName?: string;
  id?: string;
  inputClassName?: string;
  InputClassName?: string;
  InputLabelProps?: InputLabelProps;
  inputProps?: Object;
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
  label?: React.ReactElement<any> | string;
  labelClassName?: string;
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rootRef?: React.Ref<any>;
  rows?: string | number;
  rowsMax?: string | number;
  type?: string;
  value?: string | number;
  margin?: PropTypes.Margin;
} & FormControlProps;

export default class Input extends StyledComponent<TextFieldProps> {}
