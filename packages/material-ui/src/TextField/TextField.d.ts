import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { FormControlProps } from '../FormControl';
import { FormHelperTextProps } from '../FormHelperText';
import { InputProps } from '../Input';
import { InputLabelProps } from '../InputLabel';
import { FormControlClassKey } from '../FormControl';
import { SelectProps } from '../Select';

export interface TextFieldProps<C>
  extends StandardProps<FormControlProps<C>, TextFieldClassKey, 'onChange' | 'defaultValue'> {
  autoComplete?: string;
  autoFocus?: boolean;
  children?: React.ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  error?: boolean;
  FormHelperTextProps?: Partial<C & FormHelperTextProps<C>>;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  id?: string;
  InputLabelProps?: Partial<C & InputLabelProps<C>>;
  InputProps?: Partial<InputProps>;
  inputProps?: InputProps['inputProps'];
  inputRef?: React.Ref<any> | React.RefObject<any>;
  label?: React.ReactNode;
  margin?: PropTypes.Margin;
  multiline?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  select?: boolean;
  SelectProps?: Partial<C & SelectProps<C>>;
  type?: string;
  value?: Array<string | number> | string | number;
}

export type TextFieldClassKey = FormControlClassKey;

declare class TextField<C> extends React.Component<TextFieldProps<C>> {}

export default TextField;
