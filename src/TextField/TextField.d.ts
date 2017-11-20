import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';
import { FormControlClassKey } from '../Form/FormControl'

export interface TextFieldProps extends StandardProps<
  FormControlProps,
  TextFieldClassKey,
  'onChange' | 'defaultValue'
> {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
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
}

export type TextFieldClassKey =
  | FormControlClassKey
  ;


declare const Input: React.ComponentType<TextFieldProps>;

export default Input;
