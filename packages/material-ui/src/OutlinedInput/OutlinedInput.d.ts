import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface OutlinedInputProps extends StandardProps<InputBaseProps, OutlinedInputClassKey> {
  label?: React.ReactNode;
  notched?: boolean;
  labelWidth?: number;
}

export type OutlinedInputClassKey =
  | 'root'
  | 'colorSecondary'
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
  | 'inputMultiline'
  | 'inputAdornedStart'
  | 'inputAdornedEnd';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [OutlinedInput API](https://material-ui.com/api/outlined-input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
declare const OutlinedInput: React.ComponentType<OutlinedInputProps>;

export default OutlinedInput;
