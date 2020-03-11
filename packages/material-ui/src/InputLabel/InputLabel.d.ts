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
 *
 * Demos:
 * - {@link https://material-ui.com/components/text-fields Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/InputLabel InputLabel API}
 * - inherits {@link https://material-ui.com/api//api/form-label FormLabel API}
 */
declare const InputLabel: React.ComponentType<InputLabelProps>;

export default InputLabel;
