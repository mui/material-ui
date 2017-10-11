import * as React from 'react';
import { StyledComponent, PropTypes, StyledComponentProps, Omit } from '..';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';
import { FormControlClassKey } from '../Form/FormControl'

export type TextFieldProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: FormHelperTextProps & StyledComponentProps<any>;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  helperTextClassName?: string;
  id?: string;
  inputClassName?: string;
  InputClassName?: string;
  InputLabelProps?: InputLabelProps & StyledComponentProps<any>;
  inputProps?: Object;
  InputProps?: InputProps & StyledComponentProps<any>;
  inputRef?: React.Ref<any>;
  label?: React.ReactNode;
  labelClassName?: string;
  multiline?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
  rootRef?: React.Ref<any>;
  rows?: string | number;
  rowsMax?: string | number;
  select?: boolean;
  SelectProps?: Object;
  type?: string;
  value?: string | number;
  margin?: PropTypes.Margin;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & Omit<FormControlProps, 'onChange'>;

export type TextFieldClassKey =
  | FormControlClassKey
  ;

declare const Input: StyledComponent<TextFieldProps, TextFieldClassKey>;

export default Input;
