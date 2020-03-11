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
 *
 * Demos:
 * - {@link https://material-ui.com/components/text-fields Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/OutlinedInput OutlinedInput API}
 * - inherits {@link https://material-ui.com/api//api/input-base InputBase API}
 */
declare const OutlinedInput: React.ComponentType<OutlinedInputProps>;

export default OutlinedInput;
