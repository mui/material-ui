import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps<V = unknown> extends StandardProps<InputBaseProps<V>, OutlinedInputClassKey> {
  notched?: boolean;
  labelWidth: number;
}

export type OutlinedInputClassKey =
  | 'root'
  | 'focused'
  | 'disabled'
  | 'adornedStart'
  | 'adornedEnd'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'notchedOutline'
  | 'input'
  | 'inputMarginDense'
  | 'inputSelect'
  | 'inputMultiline'
  | 'inputAdornedStart'
  | 'inputAdornedEnd';

export default function OutlinedInput<V>(props: OutlinedInputProps<V>): JSX.Element;
