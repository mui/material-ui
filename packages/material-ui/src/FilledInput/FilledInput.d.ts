import * as React from 'react';
import { StandardProps, PropTypes } from '..';
import { InputBaseProps } from '../InputBase';

export interface FilledInputProps extends StandardProps<InputBaseProps, FilledInputClassKey> {
  disableUnderline?: boolean;
}

export type FilledInputClassKey =
  | 'root'
  | 'underline'
  | 'focused'
  | 'disabled'
  | 'adornedStart'
  | 'adornedEnd'
  | 'error'
  | 'multiline'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputAdornedStart'
  | 'inputAdornedEnd';

declare const FilledInput: React.ComponentType<FilledInputProps>;

export default FilledInput;
