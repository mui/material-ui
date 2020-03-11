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
 *
 * Demos:
 * - {@link https://material-ui.com/components/text-fields Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/Input Input API}
 * - inherits {@link https://material-ui.com/api//api/input-base InputBase API}
 */
declare const Input: React.ComponentType<InputProps>;

export default Input;
