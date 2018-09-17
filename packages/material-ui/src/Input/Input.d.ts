import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { InputBaseProps } from '../InputBase';

export interface InputProps extends StandardProps<InputBaseProps, InputClassKey> {}

export type InputClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'underline'
  | 'error'
  | 'multiline'
  | 'fullWidth'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputType'
  | 'inputTypeSearch';

declare const Input: React.ComponentType<InputProps>;

export default Input;
