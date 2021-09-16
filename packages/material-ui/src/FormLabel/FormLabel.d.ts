import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormLabelTypeMap<P = {}, D extends React.ElementType = 'label'> {
  props: P &
    FormLabelBaseProps & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       */
      color?: 'primary' | 'secondary';
      /**
       * If `true`, the label should be displayed in a disabled state.
       */
      disabled?: boolean;
      /**
       * If `true`, the label should be displayed in an error state.
       */
      error?: boolean;
      /**
       * If `true`, the label should use filled classes key.
       */
      filled?: boolean;
      /**
       * If `true`, the input of this label is focused (used by `FormGroup` components).
       */
      focused?: boolean;
      /**
       * If `true`, the label will indicate that the input is required.
       */
      required?: boolean;
    };
  defaultComponent: D;
  classKey: FormLabelClassKey;
}

/**
 *
 * Demos:
 *
 * - [Checkboxes](https://mui.com/components/checkboxes/)
 * - [Radio Buttons](https://mui.com/components/radio-buttons/)
 * - [Switches](https://mui.com/components/switches/)
 *
 * API:
 *
 * - [FormLabel API](https://mui.com/api/form-label/)
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
