import * as React from 'react';
import { StandardProps } from '..';
import { FormLabelProps } from '../FormLabel';

export interface InputLabelProps extends StandardProps<FormLabelProps, InputLabelClassKey> {
  /**
   * The contents of the `InputLabel`.
   */
  children?: React.ReactNode;
  color?: FormLabelProps['color'];
  /**
   * If `true`, the transition animation is disabled.
   */
  disableAnimation?: boolean;
  /**
   * If `true`, apply disabled class.
   */
  disabled?: boolean;
  /**
   * If `true`, the label will be displayed in an error state.
   */
  error?: boolean;
  /**
   * If `true`, the input of this label is focused.
   */
  focused?: boolean;
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin?: 'dense';
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required?: boolean;
  /**
   * If `true`, the label is shrunk.
   */
  shrink?: boolean;
  /**
   * The variant to use.
   */
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
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [InputLabel API](https://mui.com/api/input-label/)
 * - inherits [FormLabel API](https://mui.com/api/form-label/)
 */
export default function InputLabel(props: InputLabelProps): JSX.Element;
