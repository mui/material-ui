import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends StandardProps<InputBaseProps, OutlinedInputClassKey> {
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

declare const OutlinedInput: React.ComponentType<OutlinedInputProps>;

export default OutlinedInput;
