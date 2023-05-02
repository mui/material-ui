import * as React from 'react';
import { FormControlState } from '../FormControl';

export type UseNumberInputChangeHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  value: number | null,
) => void;

export interface UseNumberInputParameters {
  /**
   * The minimum value.
   */
  min?: number;
  /**
   * The maximum value.
   */
  max?: number;
  /**
   * The amount that the value changes on each increment or decrement.
   */
  step?: number;
  /**
   * Multiplier applied to `step` if the shift key is held while incrementing
   * or decrementing the value. Defaults to `10`.
   */
  shiftMultiplier?: number;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: unknown;
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled?: boolean;
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler;
  /**
   * Callback fired when the <input> value changes, before clamping is applied. Note that
   * `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  /**
   * Callback fired after the value is clamped and changes.
   * Called with `undefined` when the value is unset.
   */
  onValueChange?: (
    event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
    value: number | undefined,
  ) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   */
  readOnly?: boolean;
  /**
   * The current value. Use when the component is controlled.
   */
  value?: unknown;
}

export interface UseNumberInputRootSlotOwnProps {
  onClick: React.MouseEventHandler | undefined;
}

export type UseNumberInputRootSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseNumberInputRootSlotOwnProps | 'onBlur' | 'onChange' | 'onFocus'
> &
  UseNumberInputRootSlotOwnProps;

export interface UseNumberInputInputSlotOwnProps {
  defaultValue: number | undefined;
  ref: React.Ref<HTMLInputElement>;
  value: number | undefined;
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  'aria-valuemax': React.AriaAttributes['aria-valuemax'];
  'aria-valuemin': React.AriaAttributes['aria-valuemin'];
  'aria-valuenow': React.AriaAttributes['aria-valuenow'];
  'aria-valuetext': React.AriaAttributes['aria-valuetext'];
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  required: boolean;
  disabled: boolean;
}

export type UseNumberInputInputSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseNumberInputInputSlotOwnProps
> &
  UseNumberInputInputSlotOwnProps;

export interface UseNumberInputIncrementButtonSlotOwnProps {
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  disabled: boolean;
}

export type UseNumberInputIncrementButtonSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseNumberInputIncrementButtonSlotOwnProps
> &
  UseNumberInputIncrementButtonSlotOwnProps;

export interface UseNumberInputDecrementButtonSlotOwnProps {
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  disabled: boolean;
}

export type UseNumberInputDecrementButtonSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseNumberInputDecrementButtonSlotOwnProps
> &
  UseNumberInputDecrementButtonSlotOwnProps;

export interface UseNumberInputReturnValue {
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled: boolean;
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
   * @default false
   */
  error: boolean;
  /**
   * If `true`, the `input` will be focused.
   * @default false
   */
  focused: boolean;
  /**
   * Return value from the `useFormControlContext` hook.
   */
  formControlContext: FormControlState | undefined;
  /**
   * Resolver for the decrement button slot's props.
   * @param externalProps props for the decrement button slot
   * @returns props that should be spread on the decrement button slot
   */
  getDecrementButtonProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseNumberInputDecrementButtonSlotProps<TOther>;
  /**
   * Resolver for the increment button slot's props.
   * @param externalProps props for the increment button slot
   * @returns props that should be spread on the increment button slot
   */
  getIncrementButtonProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseNumberInputIncrementButtonSlotProps<TOther>;
  /**
   * Resolver for the input slot's props.
   * @param externalProps props for the input slot
   * @returns props that should be spread on the input slot
   */
  getInputProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseNumberInputInputSlotProps<TOther>;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseNumberInputRootSlotProps<TOther>;
  /**
   * If `true`, the `input` will indicate that it's required.
   * @default false
   */
  required: boolean;
  /**
   * The clamped `value` of the `input` element.
   */
  value: unknown;
  /**
   * The dirty `value` of the `input` element when it is in focus.
   */
  inputValue: string | undefined;
  /**
   * If `true`, the increment button will be disabled.
   * e.g. when the `value` is already at `max`
   * @default false
   */
  isIncrementDisabled: boolean;
  /**
   * If `true`, the decrement button will be disabled.
   * e.g. when the `value` is already at `min`
   * @default false
   */
  isDecrementDisabled: boolean;
}
