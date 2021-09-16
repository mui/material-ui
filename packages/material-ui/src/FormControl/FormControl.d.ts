import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface FormControlTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The contents of the form control.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'primary' | 'secondary';
    /**
     * If `true`, the label, input and helper text should be displayed in a disabled state.
     */
    disabled?: boolean;
    /**
     * If `true`, the label should be displayed in an error state.
     */
    error?: boolean;
    /**
     * If `true`, the component will take up the full width of its container.
     */
    fullWidth?: boolean;
    /**
     * If `true`, the component will be displayed in focused state.
     */
    focused?: boolean;
    /**
     * If `true`, the label will be hidden.
     * This is used to increase density for a `FilledInput`.
     * Be sure to add `aria-label` to the `input` element.
     */
    hiddenLabel?: boolean;
    /**
     * If `dense` or `normal`, will adjust vertical spacing of this and contained components.
     */
    margin?: PropTypes.Margin;
    /**
     * If `true`, the label will indicate that the input is required.
     */
    required?: boolean;
    /**
     * The size of the text field.
     */
    size?: 'small' | 'medium';
    /**
     * The variant to use.
     */
    variant?: 'standard' | 'outlined' | 'filled';
  };
  defaultComponent: D;
  classKey: FormControlClassKey;
}

/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibility and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *
 * -   FormLabel
 * -   FormHelperText
 * -   Input
 * -   InputLabel
 *
 * You can find one composition example below and more going to [the demos](https://mui.com/components/text-fields/#components).
 *
 * ```jsx
 * <FormControl>
 *   <InputLabel htmlFor="my-input">Email address</InputLabel>
 *   <Input id="my-input" aria-describedby="my-helper-text" />
 *   <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
 * </FormControl>
 * ```
 *
 * ⚠️Only one input can be used within a FormControl.
 * Demos:
 *
 * - [Checkboxes](https://mui.com/components/checkboxes/)
 * - [Radio Buttons](https://mui.com/components/radio-buttons/)
 * - [Switches](https://mui.com/components/switches/)
 * - [Text Fields](https://mui.com/components/text-fields/)
 *
 * API:
 *
 * - [FormControl API](https://mui.com/api/form-control/)
 */
declare const FormControl: OverridableComponent<FormControlTypeMap>;

export type FormControlClassKey = 'root' | 'marginNormal' | 'marginDense' | 'fullWidth';

export type FormControlProps<
  D extends React.ElementType = FormControlTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<FormControlTypeMap<P, D>, D>;

export default FormControl;
