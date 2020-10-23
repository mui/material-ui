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
       * Override or extend the styles applied to the component.
       */
      classes?: {
        /** Styles applied to the root element. */
        root?: string;
        /** Styles applied to the root element if the color is secondary. */
        colorSecondary?: string;
        /** Pseudo-class applied to the root element if `focused={true}`. */
        focused?: string;
        /** Pseudo-class applied to the root element if `disabled={true}`. */
        disabled?: string;
        /** Pseudo-class applied to the root element if `error={true}`. */
        error?: string;
        /** Pseudo-class applied to the root element if `filled={true}`. */
        filled?: string;
        /** Pseudo-class applied to the root element if `required={true}`. */
        required?: string;
        /** Styles applied to the asterisk element. */
        asterisk?: string;
      };
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
}

/**
 *
 * Demos:
 *
 * - [Checkboxes](https://material-ui.com/components/checkboxes/)
 * - [Radio Buttons](https://material-ui.com/components/radio-buttons/)
 * - [Switches](https://material-ui.com/components/switches/)
 *
 * API:
 *
 * - [FormLabel API](https://material-ui.com/api/form-label/)
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

export type FormLabelClassKey = keyof NonNullable<FormLabelTypeMap['props']['classes']>;

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelProps<
  D extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormLabelTypeMap<P, D>, D>;

export default FormLabel;
