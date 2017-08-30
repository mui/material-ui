import * as React from 'react';
import { StyledComponent, PropTypes } from '..';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';

export type SelectFieldProps = {
  autoFocus?: boolean;
  children?: Element<*>;
  className?: string;
  compareFunction?: Function;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  helperText?: string | Element<*>;
  helperTextClassName?: string;
  hideLabel?: boolean;
  id?: string;
  inputClassName?: string;
  InputClassName?: string;
  InputLabelProps?: InputLabelProps;
  inputProps?: Object;
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
  label?: string | Element<*>;
  labelClassName?: string;
  menuClassName?: string;
  menuProps?: Object;
  name?: string;
  onBlur?: Function;
  onChange?: Function;
  onClean?: Function;
  onDirty?: Function;
  onFocus?: Function;
  placeholder?: string;
  required?: boolean;
  rootRef?: Function;
  type?: string;
  value?: string | number;
} & FormControlProps;

export default class Input extends StyledComponent<SelectFieldProps> {}
