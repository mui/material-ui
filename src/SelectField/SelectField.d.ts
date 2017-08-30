import * as React from 'react';
import { StyledComponent } from '..';
import { FormControlProps, FormHelperTextProps } from '../Form';
import { InputProps, InputLabelProps } from '../Input';

export type SelectFieldProps = {
  autoFocus?: boolean;
  children?: React.ReactElement<any>;
  className?: string;
  compareFunction?: Function;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: FormHelperTextProps;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  helperTextClassName?: string;
  hideLabel?: boolean;
  id?: string;
  inputClassName?: string;
  InputClassName?: string;
  InputLabelProps?: InputLabelProps;
  inputProps?: Object;
  InputProps?: InputProps;
  inputRef?: React.Ref<any>;
  label?: React.ReactElement<any> | string;
  labelClassName?: string;
  menuClassName?: string;
  menuProps?: Object;
  name?: string;
  onBlur?: React.EventHandler<any>;
  onChange?: React.EventHandler<any>;
  onClean?: () => void;
  onDirty?: () => void;
  onFocus?: React.EventHandler<any>;
  placeholder?: string;
  required?: boolean;
  rootRef?: React.Ref<any>;
  type?: string;
  value?: string | number;
} & FormControlProps;

export default class SelectField extends StyledComponent<SelectFieldProps> {}
