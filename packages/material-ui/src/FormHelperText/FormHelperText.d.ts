import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormHelperTextTypeMap<P = {}, D extends React.ElementType = 'p'> {
  props: P & {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense';
    required?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormHelperTextClassKey;
}
/**
 *
 * Demos:
 *
 * - [Text Fields](https://material-ui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormHelperText API](https://material-ui.com/api/form-helper-text/)
 */
declare const FormHelperText: OverridableComponent<FormHelperTextTypeMap>;

export type FormHelperTextClassKey =
  | 'root'
  | 'error'
  | 'disabled'
  | 'marginDense'
  | 'focused'
  | 'filled'
  | 'contained'
  | 'required';

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export default FormHelperText;
