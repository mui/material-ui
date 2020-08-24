import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormHelperTextTypeMap<P = {}, D extends React.ElementType = 'p'> {
  props: P & {
    /**
     * The content of the component.
     *
     * If `' '` is provided, the component reserves one line height for displaying a future message.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Pseudo-class applied to the root element if `error={true}`. */
      error?: string;
      /** Pseudo-class applied to the root element if `disabled={true}`. */
      disabled?: string;
      /** Styles applied to the root element if `margin="dense"`. */
      marginDense?: string;
      /** Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
      contained?: string;
      /** Pseudo-class applied to the root element if `focused={true}`. */
      focused?: string;
      /** Pseudo-class applied to the root element if `filled={true}`. */
      filled?: string;
      /** Pseudo-class applied to the root element if `required={true}`. */
      required?: string;
    };
    /**
     * If `true`, the helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, helper text should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the helper text should use filled classes key.
     */
    filled?: boolean;
    /**
     * If `true`, the helper text should use focused classes key.
     */
    focused?: boolean;
    /**
     * If `dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin?: 'dense';
    /**
     * If `true`, the helper text should use required classes key.
     */
    required?: boolean;
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
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

export type FormHelperTextClassKey = keyof NonNullable<FormHelperTextTypeMap['props']['classes']>;

export type FormHelperTextProps<
  D extends React.ElementType = FormHelperTextTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormHelperTextTypeMap<P, D>, D>;

export default FormHelperText;
