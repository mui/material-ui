import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { FormControlProps } from '../FormControl';
import { FormHelperTextProps } from '../FormHelperText';
import { InputProps as StandardInputProps } from '../Input';
import { FilledInputProps } from '../FilledInput';
import { OutlinedInputProps } from '../OutlinedInput';
import { InputLabelProps } from '../InputLabel';
import { SelectProps } from '../Select';

export interface BaseTextFieldProps<V = unknown>
  extends StandardProps<FormControlProps, TextFieldClassKey, 'onChange' | 'defaultValue'> {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: V;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  InputLabelProps?: Partial<InputLabelProps>;
  inputRef?: React.Ref<any> | React.RefObject<any>;
  label?: React.ReactNode;
  margin?: PropTypes.Margin;
  multiline?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  select?: boolean;
  SelectProps?: Partial<SelectProps<V>>;
  type?: string;
  value?: V;
}

export interface StandardTextFieldProps<V = unknown> extends BaseTextFieldProps<V> {
  variant?: 'standard';
  InputProps?: Partial<StandardInputProps<V>>;
  inputProps?: StandardInputProps<V>['inputProps'];
}

export interface FilledTextFieldProps<V = unknown> extends BaseTextFieldProps<V> {
  variant: 'filled';
  InputProps?: Partial<FilledInputProps<V>>;
  inputProps?: FilledInputProps<V>['inputProps'];
}

export interface OutlinedTextFieldProps<V = unknown> extends BaseTextFieldProps<V> {
  variant: 'outlined';
  InputProps?: Partial<OutlinedInputProps<V>>;
  inputProps?: OutlinedInputProps<V>['inputProps'];
}

export type TextFieldProps<V = unknown> = StandardTextFieldProps<V> | FilledTextFieldProps<V> | OutlinedTextFieldProps<V>;

export type TextFieldClassKey = 'root';

export default function TextField<V>(props: TextFieldProps<V>): JSX.Element;
