import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { FormLabelClasses } from './formLabelClasses';

export interface FormLabelPropsColorOverrides {}

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
      classes?: Partial<FormLabelClasses>;
      /**
       * The color of the component.
       * It supports both default and custom theme colors, which can be added as shown in the
       * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
       */
      color?: OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        FormLabelPropsColorOverrides
      >;
      /**
       * If `true`, the label should be displayed in a disabled state.
       */
      disabled?: boolean;
      /**
       * If `true`, the label is displayed in an error state.
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
       * If `true`, the label will indicate that the `input` is required.
       */
      required?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/material-ui/react-checkbox/)
 * - [Radio Group](https://mui.com/material-ui/react-radio-button/)
 * - [Switch](https://mui.com/material-ui/react-switch/)
 *
 * API:
 *
 * - [FormLabel API](https://mui.com/material-ui/api/form-label/)
 */
declare const FormLabel: OverridableComponent<FormLabelTypeMap>;

export type FormLabelBaseProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export type FormLabelProps<
  D extends React.ElementType = FormLabelTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<FormLabelTypeMap<P, D>, D>;

export default FormLabel;
