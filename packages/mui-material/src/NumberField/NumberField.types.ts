import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import type { OverridableStringUnion } from '@mui/types';

import type { InputProps as StandardInputProps } from '../Input';
import type { InternalStandardProps as StandardProps } from '../internal';
import type { FormControlProps } from '../FormControl';
import type { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import type { NumberFieldClasses } from './numberFieldClasses';
import type { FormHelperTextProps } from '../FormHelperText';
import type { InputLabelProps } from '../InputLabel';
import type { Theme } from '../styles/createTheme';
import type { FilledInputProps } from '../FilledInput';
import type { IconButtonProps } from '../IconButton';
import type { InputBaseProps } from '../InputBase';
import type { OutlinedInputProps } from '../OutlinedInput';
import type { SxProps } from '../styles';

export type NumberFieldVariants = 'outlined' | 'standard' | 'filled';

type ControlsPosition = 'stacked' | 'end' | 'split' | false;

export interface NumberFieldSlots {
  /**
   * The component that renders the decrement button.
   * @default IconButton
   */
  decrementButton: React.ElementType;
  /**
   * The component that renders the helper text.
   * @default FormHelperText
   */
  formHelperText: React.ElementType;
  /**
   * The component that renders the native input element.
   * @default 'input'
   */
  htmlInput: React.ElementType;
  /**
   * The component that renders the increment button.
   * @default IconButton
   */
  incrementButton: React.ElementType;
  /**
   * The component that renders the Material input wrapper.
   * @default OutlinedInput
   */
  input: React.ElementType;
  /**
   * The component that renders the input's label.
   * @default InputLabel
   */
  inputLabel: React.ElementType;
  /**
   * The component that renders the root.
   * @default FormControl
   */
  root: React.ElementType;
  /**
   * The component that renders the drag handle for adjusting the value.
   * @default 'span'
   */
  scrubArea: React.ElementType;
  /**
   * The component that renders the custom cursor while dragging the scrub area.
   * @default 'span'
   */
  scrubAreaCursor: React.ElementType;
}

export interface NumberFieldPropsSizeOverrides {}
export interface NumberFieldPropsColorOverrides {}

export interface NumberFieldRootSlotPropsOverrides {}
export interface NumberFieldInputSlotPropsOverrides {}
export interface NumberFieldHtmlInputSlotPropsOverrides {}
export interface NumberFieldFormHelperTextSlotPropsOverrides {}
export interface NumberFieldInputLabelSlotPropsOverrides {}
export interface NumberFieldDecrementButtonSlotPropsOverrides {}
export interface NumberFieldIncrementButtonSlotPropsOverrides {}
export interface NumberFieldScrubAreaSlotPropsOverrides {}
export interface NumberFieldScrubAreaCursorSlotPropsOverrides {}

export type NumberFieldSlotsAndSlotProps<InputPropsType> = CreateSlotsAndSlotProps<
  NumberFieldSlots,
  {
    /**
     * Props forwarded to the decrement button slot.
     * By default, the available props are based on the [IconButton](https://mui.com/material-ui/api/icon-button/#props) component.
     * Set `nativeButton` to `false` when rendering an element other than a native `<button>`.
     */
    decrementButton: SlotProps<
      React.ElementType<IconButtonProps>,
      NumberFieldDecrementButtonSlotPropsOverrides &
        Pick<BaseNumberField.Decrement.Props, 'nativeButton'>,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the form helper text slot.
     * By default, the available props are based on the [FormHelperText](https://mui.com/material-ui/api/form-helper-text/#props) component.
     */
    formHelperText: SlotProps<
      React.ElementType<FormHelperTextProps>,
      NumberFieldFormHelperTextSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the native `<input>` element.
     */
    htmlInput: SlotProps<
      React.ElementType<InputBaseProps['inputProps']>,
      NumberFieldHtmlInputSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the increment button slot.
     * By default, the available props are based on the [IconButton](https://mui.com/material-ui/api/icon-button/#props) component.
     * Set `nativeButton` to `false` when rendering an element other than a native `<button>`.
     */
    incrementButton: SlotProps<
      React.ElementType<IconButtonProps>,
      NumberFieldIncrementButtonSlotPropsOverrides &
        Pick<BaseNumberField.Increment.Props, 'nativeButton'>,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the Material input wrapper.
     * Depending on `variant`, the available props are based on [OutlinedInput](https://mui.com/material-ui/api/outlined-input/#props),
     * [FilledInput](https://mui.com/material-ui/api/filled-input/#props), or [Input](https://mui.com/material-ui/api/input/#props).
     */
    input: SlotProps<
      React.ElementType<InputPropsType>,
      NumberFieldInputSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the input label slot.
     * By default, the available props are based on the [InputLabel](https://mui.com/material-ui/api/input-label/#props) component.
     */
    inputLabel: SlotProps<
      React.ElementType<InputLabelProps>,
      NumberFieldInputLabelSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the [FormControl](https://mui.com/material-ui/api/form-control/#props) component.
     */
    root: SlotProps<
      React.ElementType<FormControlProps>,
      NumberFieldRootSlotPropsOverrides,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the scrub area slot.
     * Supports native `<span>` props and the `direction`, `pixelSensitivity`, and `teleportDistance` options from Base UI.
     */
    scrubArea: SlotProps<
      'span',
      NumberFieldScrubAreaSlotPropsOverrides &
        Pick<
          BaseNumberField.ScrubArea.Props,
          'direction' | 'pixelSensitivity' | 'teleportDistance'
        >,
      NumberFieldOwnerState
    >;
    /**
     * Props forwarded to the custom cursor displayed while scrubbing.
     * By default, the available props are based on the native `<span>` element.
     */
    scrubAreaCursor: SlotProps<
      'span',
      NumberFieldScrubAreaCursorSlotPropsOverrides,
      NumberFieldOwnerState
    >;
  }
>;

export interface BaseNumberFieldProps extends StandardProps<
  FormControlProps,
  'children' | 'defaultValue' | 'onChange' | 'onBlur' | 'onFocus'
> {
  /**
   * If `true`, values entered by typing or pasting are not clamped to `min` and `max`.
   * Stepping with the buttons, keyboard, mouse wheel, or scrub area still respects the bounds.
   * @default false
   */
  allowOutOfRange?: BaseNumberField.Root.Props['allowOutOfRange'] | undefined;
  /**
   * If `true`, the mouse wheel adjusts the value while the input is focused and hovered.
   * @default false
   */
  allowWheelScrub?: BaseNumberField.Root.Props['allowWheelScrub'] | undefined;
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus?: boolean | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<NumberFieldClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        NumberFieldPropsColorOverrides
      >
    | undefined;
  /**
   * The arrangement of the control buttons.
   * Use `'end'` for horizontal minus/plus buttons at the end, `'split'` for a minus button
   * at the start and a plus button at the end, `'stacked'` for up/down chevrons at the end,
   * or `false` for no control buttons.
   * @default 'end'
   */
  controlsPosition?: ControlsPosition | undefined;
  /**
   * The initial numeric value for an uncontrolled field.
   * Omit this prop to start with an empty field.
   * Use `value` for a controlled field.
   */
  defaultValue?: BaseNumberField.Root.Props['defaultValue'] | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the field is displayed in an error state.
   * @default false
   */
  error?: boolean | undefined;
  /**
   * The `id` of the form that owns the field.
   * Use this prop when the field is rendered outside the form.
   */
  form?: BaseNumberField.Root.Props['form'] | undefined;
  /**
   * Options passed to `Intl.NumberFormat` to format the displayed value.
   * The `value` prop and value callbacks use numbers or `null`, regardless of the display format.
   *
   * See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  format?: BaseNumberField.Root.Props['format'] | undefined;
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The helper text content.
   */
  helperText?: React.ReactNode | undefined;
  /**
   * The `id` of the visible input, used to associate its label and helper text.
   * If omitted, an ID is generated.
   */
  id?: string | undefined;
  /**
   * A ref to the visible `<input>` element.
   */
  inputRef?: React.Ref<HTMLInputElement> | undefined;
  /**
   * The label content.
   */
  label?: React.ReactNode | undefined;
  /**
   * The amount to increment or decrement while holding the Shift key.
   * @default 10
   */
  largeStep?: BaseNumberField.Root.Props['largeStep'] | undefined;
  /**
   * The locale or locales used to format and parse the value.
   * Defaults to the runtime's locale.
   *
   * See [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  locale?: BaseNumberField.Root.Props['locale'] | undefined;
  /**
   * The upper bound for the numeric value.
   * The increment button is disabled at or above this value.
   */
  max?: BaseNumberField.Root.Props['max'] | undefined;
  /**
   * The lower bound for the numeric value.
   * The decrement button is disabled at or below this value.
   */
  min?: BaseNumberField.Root.Props['min'] | undefined;
  /**
   * Identifies the field when a form is submitted.
   * The submitted value is the unformatted number.
   */
  name?: string | undefined;
  /**
   * Callback fired when the input loses focus.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  /**
   * Callback fired when the input receives focus.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  /**
   * Callback fired when the numeric value changes.
   * Call `eventDetails.cancel()` to reject the proposed change.
   *
   * @param {number|null} value The new numeric value, or `null` when the input is empty.
   * @param {object} eventDetails The interaction details, including the native `event` and a `reason`:
   * `"input-change"`, `"input-clear"`, `"input-blur"`, `"input-paste"`, `"keyboard"`,
   * `"increment-press"`, `"decrement-press"`, `"wheel"`, `"scrub"`, or `"none"`.
   */
  onValueChange?: BaseNumberField.Root.Props['onValueChange'] | undefined;
  /**
   * Callback fired when the value is committed.
   * Direct text entry commits on blur.
   * Pointer presses on the stepper buttons and scrub interactions commit on pointer release.
   * Keyboard and wheel changes commit immediately.
   *
   * @param {number|null} value The committed numeric value, or `null` when the input is empty.
   * @param {object} eventDetails The interaction details, including the native `event` and a `reason`:
   * `"input-blur"`, `"input-clear"`, `"keyboard"`, `"increment-press"`, `"decrement-press"`,
   * `"wheel"`, `"scrub"`, or `"none"`.
   */
  onValueCommitted?: BaseNumberField.Root.Props['onValueCommitted'] | undefined;
  /**
   * The short hint displayed in the input when it is empty.
   */
  placeholder?: string | undefined;
  /**
   * If `true`, the value cannot be changed through user interaction.
   * The input can still receive focus.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If `true`, a value is required for form submission and the label is marked as required.
   * @default false
   */
  required?: boolean | undefined;
  /**
   * The placement of the drag handle used to adjust the value.
   * Use `'start'` or `'end'` to show the handle, or `false` to hide it.
   * Its position is independent of `controlsPosition`.
   * @default false
   */
  scrubAreaPosition?: 'start' | 'end' | false | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', NumberFieldPropsSizeOverrides> | undefined;
  /**
   * The amount to increment or decrement while holding the Alt key (Option on macOS).
   * @default 0.1
   */
  smallStep?: BaseNumberField.Root.Props['smallStep'] | undefined;
  /**
   * If `true`, stepping snaps the value to intervals starting at `min`, or `0` if `min` is omitted.
   * Modifier keys use the corresponding `smallStep` or `largeStep` intervals.
   * @default false
   */
  snapOnStep?: BaseNumberField.Root.Props['snapOnStep'] | undefined;
  /**
   * The amount to increment or decrement with the buttons, arrow keys, mouse wheel, or scrub area.
   * Set `min` explicitly to enable step validation on form submission.
   * Set to `"any"` to disable step validation; interactive stepping then uses `1`,
   * while the Alt and Shift keys still use `smallStep` and `largeStep`.
   * @default 1
   */
  step?: BaseNumberField.Root.Props['step'] | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The controlled numeric value.
   * Use `null` to display an empty field and `onValueChange` to update the value.
   */
  value?: BaseNumberField.Root.Props['value'] | undefined;
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: NumberFieldVariants | undefined;
}

export interface StandardNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<StandardInputProps> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'standard';
}

export interface OutlinedNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<OutlinedInputProps> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: 'outlined' | undefined;
}

export interface FilledNumberFieldProps
  extends BaseNumberFieldProps, NumberFieldSlotsAndSlotProps<FilledInputProps> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: 'filled';
}

export type NumberFieldProps<Variant extends NumberFieldVariants = NumberFieldVariants> =
  Variant extends 'filled'
    ? FilledNumberFieldProps
    : Variant extends 'standard'
      ? StandardNumberFieldProps
      : OutlinedNumberFieldProps;

export interface NumberFieldOwnerState
  extends BaseNumberFieldProps, Pick<NumberFieldProps, 'slots' | 'slotProps'> {
  autoFocus: boolean;
  controlsPosition: NonNullable<NumberFieldProps['controlsPosition']>;
  color: NonNullable<NumberFieldProps['color']>;
  disabled: boolean;
  error: boolean;
  fullWidth: boolean;
  readOnly: boolean;
  required: boolean;
  scrubAreaPosition: NonNullable<NumberFieldProps['scrubAreaPosition']>;
  size: NonNullable<NumberFieldProps['size']>;
  variant: NumberFieldVariants;
}
