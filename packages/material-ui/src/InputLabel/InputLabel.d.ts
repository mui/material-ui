import * as React from 'react';
import { StandardProps } from '..';
import { FormLabelProps } from '../FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  margin?: 'dense';
  required?: boolean;
  shrink?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

export type InputLabelClassKey =
  | 'root'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'required'
  | 'asterisk'
  | 'formControl'
  | 'marginDense'
  | 'shrink'
  | 'animated'
  | 'filled'
  | 'outlined';

/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputLabel API](https://material-ui.com/api/input-label/)
 * - inherits [FormLabel API](https://material-ui.com/api/form-label/)
 */
declare const InputLabel: React.ComponentType<InputLabelProps>;

export default InputLabel;
