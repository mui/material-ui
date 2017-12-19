import * as React from 'react';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';
import { FormControlClassKey } from '../Form/FormControl';
import { SelectProps } from '../Select';
import { Margin, StandardProps } from '../MuiProps';

export interface TextFieldProps
  extends StandardProps<FormControlProps, TextFieldClassKey, 'onChange' | 'defaultValue'> {
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
  InputLabelProps?: InputLabelProps;
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
  label?: React.ReactNode;
  labelClassName?: string;
  margin?: Margin;
  multiline?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  rootRef?: React.Ref<any>;
  rows?: string | number;
  rowsMax?: string | number;
  select?: boolean;
  SelectProps?: SelectProps;
  type?: string;
  value?: string | number;
}

export type TextFieldClassKey = FormControlClassKey;

declare const Input: React.ComponentType<TextFieldProps>;

export default Input;
