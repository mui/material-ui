import * as React from 'react';
import { StandardProps } from '..';
import { InputBaseProps } from '../InputBase';

export interface InputProps extends StandardProps<InputBaseProps, InputClassKey> {
  disableUnderline?: boolean;
}

export type InputClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'colorSecondary'
  | 'underline'
  | 'error'
  | 'marginDense'
  | 'multiline'
  | 'fullWidth'
  | 'input'
  | 'inputMarginDense'
  | 'inputMultiline'
  | 'inputTypeSearch';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [Input API](https://material-ui.com/api/input/)
 * - inherits [InputBase API](https://material-ui.com/api/input-base/)
 */
declare const Input: React.ComponentType<InputProps>;

export default Input;
