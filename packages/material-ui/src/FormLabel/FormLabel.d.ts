import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P &
    FormLabelBaseProps & {
      color?: 'primary' | 'secondary';
      disabled?: boolean;
      error?: boolean;
      filled?: boolean;
      focused?: boolean;
      required?: boolean;
    };
  defaultComponent: D;
  classKey: FormLabelClassKey;
}

/**
 * 
 *
 * Demos:
 * - {@link https://material-ui.com/components/checkboxes Checkboxes}
 * - {@link https://material-ui.com/components/radio-buttons Radio Buttons}
 * - {@link https://material-ui.com/components/switches Switches}
 *
 * API:
 * - {@link https://material-ui.com/api/FormLabel FormLabel API}
 * 
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

export type FormLabelClassKey =
  | 'root'
  | 'colorSecondary'
  | 'focused'
  | 'disabled'
  | 'error'
  | 'filled'
  | 'required'
  | 'asterisk';

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelProps<
  D extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormLabelTypeMap<P, D>, D>;

export default FormLabel;
