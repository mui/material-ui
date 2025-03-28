import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { InternalStandardProps as StandardProps } from '..';
import { FormControlProps } from '../FormControl';
import { FormHelperTextProps } from '../FormHelperText';
import { InputBaseProps } from '../InputBase';
import { InputProps as StandardInputProps } from '../Input';
import { FilledInputProps } from '../FilledInput';
import { OutlinedInputProps } from '../OutlinedInput';
import { InputLabelProps } from '../InputLabel';
import { SelectProps } from '../Select';
import { Theme } from '../styles';
import { TextFieldClasses } from './textFieldClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface TextFieldPropsColorOverrides {}
export interface TextFieldPropsSizeOverrides {}

export interface TextFieldSlots {
  /**
   * The component that renders the root.
   * @default FormControl
   */
  root: React.ElementType;
  /**
   * The component that renders the input.
   * @default OutlinedInput
   */
  input: React.ElementType;
  /**
   * The component that renders the input's label.
   * @default InputLabel
   */
  inputLabel: React.ElementType;
  /**
   * The html input element.
   * @default 'input'
   */
  htmlInput: React.ElementType;
  /**
   * The component that renders the helper text.
   * @default FormHelperText
   */
  formHelperText: React.ElementType;
  /**
   * The component that renders the select.
   * @default Select
   */
  select: React.ElementType;
}

export type TextFieldSlotsAndSlotProps<InputPropsType> = CreateSlotsAndSlotProps<
  TextFieldSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the avaible props are based on the [FormControl](https://mui.com/material-ui/api/form-control/#props) component.
     */
    root: SlotProps<React.ElementType<FormControlProps>, {}, TextFieldOwnerState>;
    /**
     * Props forwarded to the input slot.
     * By default, the avaible props are based on the [Input](https://mui.com/material-ui/api/input/#props) component.
     */
    input: SlotProps<React.ElementType<InputPropsType>, {}, TextFieldOwnerState>;
    /**
     * Props forwarded to the input label slot.
     * By default, the avaible props are based on the [InputLabel](https://mui.com/material-ui/api/input-label/#props) component.
     */
    inputLabel: SlotProps<React.ElementType<InputLabelProps>, {}, TextFieldOwnerState>;
    /**
     * Props forwarded to the html input slot.
     * By default, the avaible props are based on the html input element.
     */
    htmlInput: SlotProps<React.ElementType<InputBaseProps['inputProps']>, {}, TextFieldOwnerState>;
    /**
     * Props forwarded to the form helper text slot.
     * By default, the avaible props are based on the [FormHelperText](https://mui.com/material-ui/api/form-helper-text/#props) component.
     */
    formHelperText: SlotProps<React.ElementType<FormHelperTextProps>, {}, TextFieldOwnerState>;
    /**
     * Props forwarded to the select slot.
     * By default, the avaible props are based on the [Select](https://mui.com/material-ui/api/select/#props) component.
     */
    select: SlotProps<React.ElementType<SelectProps>, {}, TextFieldOwnerState>;
  }
>;

export interface BaseTextFieldProps
  extends StandardProps<
    FormControlProps,
    // event handlers are declared on derived interfaces
    'onChange' | 'onBlur' | 'onFocus' | 'defaultValue'
  > {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean;
  /**
   * @ignore
   */
  children?: FormControlProps['children'];
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TextFieldClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    TextFieldPropsColorOverrides
  >;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Props applied to the [`FormHelperText`](https://mui.com/material-ui/api/form-helper-text/) element.
   * @deprecated Use `slotProps.formHelperText` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FormHelperTextProps?: Partial<FormHelperTextProps>;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id?: string;
  /**
   * Props applied to the [`InputLabel`](https://mui.com/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   * @deprecated Use `slotProps.inputLabel` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputLabelProps?: Partial<InputLabelProps>;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @deprecated Use `slotProps.htmlInput` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputProps?: InputBaseProps['inputProps'];
  /**
   * Pass a ref to the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * The label content.
   */
  label?: React.ReactNode;
  /**
   * If `true`, a `textarea` element is rendered instead of an input.
   * @default false
   */
  multiline?: boolean;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  onBlur?: InputBaseProps['onBlur'];
  onFocus?: StandardInputProps['onFocus'];
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows?: string | number;
  /**
   * Render a [`Select`](https://mui.com/material-ui/api/select/) element while passing the Input element to `Select` as `input` parameter.
   * If this option is set you must pass the options of the select as children.
   * @default false
   */
  select?: boolean;
  /**
   * Props applied to the [`Select`](https://mui.com/material-ui/api/select/) element.
   * @deprecated Use `slotProps.select` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  SelectProps?: Partial<SelectProps>;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: React.InputHTMLAttributes<unknown>['type'];
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

export interface StandardTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<StandardInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: StandardInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'standard';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps?: Partial<StandardInputProps>;
}

export interface FilledTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<FilledInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: FilledInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'filled';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps?: Partial<FilledInputProps>;
}

export interface OutlinedTextFieldProps
  extends BaseTextFieldProps,
    TextFieldSlotsAndSlotProps<OutlinedInputProps> {
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: OutlinedInputProps['onChange'];
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'outlined';
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](https://mui.com/material-ui/api/filled-input/),
   * [`OutlinedInput`](https://mui.com/material-ui/api/outlined-input/) or [`Input`](https://mui.com/material-ui/api/input/)
   * component depending on the `variant` prop value.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  InputProps?: Partial<OutlinedInputProps>;
}

export type TextFieldVariants = 'outlined' | 'standard' | 'filled';

export type TextFieldProps<Variant extends TextFieldVariants = TextFieldVariants> =
  Variant extends 'filled'
    ? FilledTextFieldProps
    : Variant extends 'standard'
      ? StandardTextFieldProps
      : OutlinedTextFieldProps;

export type TextFieldOwnerState = BaseTextFieldProps;

/**
 * The `TextField` is a convenience wrapper for the most common cases (80%).
 * It cannot be all things to all people, otherwise the API would grow out of control.
 *
 * ## Advanced Configuration
 *
 * It's important to understand that the text field is a simple abstraction
 * on top of the following components:
 *
 * * [FormControl](https://v6.mui.com/material-ui/api/form-control/)
 * * [InputLabel](https://v6.mui.com/material-ui/api/input-label/)
 * * [FilledInput](https://v6.mui.com/material-ui/api/filled-input/)
 * * [OutlinedInput](https://v6.mui.com/material-ui/api/outlined-input/)
 * * [Input](https://v6.mui.com/material-ui/api/input/)
 * * [FormHelperText](https://v6.mui.com/material-ui/api/form-helper-text/)
 *
 * If you wish to alter the props applied to the `input` element, you can do so as follows:
 *
 * ```jsx
 * const inputProps = {
 *   step: 300,
 * };
 *
 * return <TextField id="time" type="time" inputProps={inputProps} />;
 * ```
 *
 * For advanced cases, please look at the source of TextField by clicking on the
 * "Edit this page" button above. Consider either:
 *
 * * using the upper case props for passing values directly to the components
 * * using the underlying components directly as shown in the demos
 *
 * Demos:
 *
 * - [Autocomplete](https://v6.mui.com/material-ui/react-autocomplete/)
 * - [Text Field](https://v6.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [TextField API](https://v6.mui.com/material-ui/api/text-field/)
 * - inherits [FormControl API](https://v6.mui.com/material-ui/api/form-control/)
 */
export default function TextField<Variant extends TextFieldVariants>(
  props: {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: Variant;
  } & Omit<TextFieldProps, 'variant'>,
): React.JSX.Element;
