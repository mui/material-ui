import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface InputProps<V = unknown> extends StandardProps<InputBaseProps<V>, InputClassKey> {
  disableUnderline?: boolean;
}

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
  | 'inputTypeSearch';

export default function Input<V>(props: InputProps<V>): JSX.Element;
