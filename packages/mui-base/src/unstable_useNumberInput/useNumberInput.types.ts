import * as React from 'react';
import { FormControlState } from '../FormControl';
import { NumberInputAction } from './numberInputAction.types';
import { ActionWithContext } from '../utils/useControllableReducer.types';

export type StepDirection = 'up' | 'down';

/**
 * The internal state of the NumberInput.
 * Modify via the reducer only.
 */
export interface NumberInputState {
  /**
   * The clamped `value` of the `input` element.
   */
  value: number | null;
  /**
   * The dirty `value` of the `input` element when it is in focus.
   */
  inputValue: string;
}

/**
 * Additional props passed to the number input reducer actions.
 */
export type NumberInputActionContext = {
  min?: number;
  max?: number;
  step?: number;
  shiftMultiplier: number;
  /**
   * A function that parses the raw input value
   */
  getInputValueAsString: (val: string) => string;
};

export type NumberInputReducerAction = ActionWithContext<
  NumberInputAction,
  NumberInputActionContext
>;

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
  defaultValue?: number | null;
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
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: React.MouseEventHandler;
  /**
   * Callback fired when the `input` value changes after each keypress, before clamping is applied.
   * Note that `event.target.value` may contain values that fall outside of `min` and `max` or
   * are otherwise "invalid".
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   */
  onInputChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  /**
   * Callback fired after the value is clamped and changes - when the `input` is blurred or when
   * the stepper buttons are triggered.
   * Called with `undefined` when the value is unset.
   *
   * @param {React.FocusEvent<HTMLInputElement>|React.PointerEvent|React.KeyboardEvent} event The event source of the callback
   * @param {number|undefined} value The new value of the component
   */
  onChange?: (
    event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
    value: number | null,
  ) => void;
  /**
   * The `id` attribute of the input element.
   */
  inputId?: string;
  /**
   * The ref of the input element.
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  /**
   * If `true`, the `input` element becomes read-only. The stepper buttons remain active,
   * with the addition that they are now keyboard focusable.
   * @default false
   */
  readOnly?: boolean;
  /**
   * The current value. Use when the component is controlled.
   * @default null
   */
  value?: number | null;
  /**
   * The name of the component using useNumberInput.
   * For debugging purposes.
   * @default 'useNumberInput'
   */
  componentName?: string;
}

export interface UseNumberInputRootSlotOwnProps {
  onClick: React.MouseEventHandler | undefined;
}

export type UseNumberInputRootSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseNumberInputRootSlotOwnProps | 'onBlur' | 'onInputChange' | 'onFocus'
> &
  UseNumberInputRootSlotOwnProps;

export interface UseNumberInputInputSlotOwnProps {
  defaultValue: number | undefined;
  id: string | undefined;
  ref: React.RefCallback<HTMLInputElement> | null;
  value: number | undefined;
  role?: React.AriaRole;
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  'aria-valuemax': React.AriaAttributes['aria-valuemax'];
  'aria-valuemin': React.AriaAttributes['aria-valuemin'];
  'aria-valuenow': React.AriaAttributes['aria-valuenow'];
  'aria-valuetext': React.AriaAttributes['aria-valuetext'];
  tabIndex?: number;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  required: boolean;
  disabled: boolean;
}

export type UseNumberInputInputSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseNumberInputInputSlotOwnProps
> &
  UseNumberInputInputSlotOwnProps;

export interface UseNumberInputIncrementButtonSlotOwnProps {
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  disabled: boolean;
  tabIndex?: number;
}

export type UseNumberInputIncrementButtonSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseNumberInputIncrementButtonSlotOwnProps
> &
  UseNumberInputIncrementButtonSlotOwnProps;

export interface UseNumberInputDecrementButtonSlotOwnProps {
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-disabled': React.AriaAttributes['aria-disabled'];
  disabled: boolean;
  tabIndex?: number;
}

export type UseNumberInputDecrementButtonSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
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
  getDecrementButtonProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseNumberInputDecrementButtonSlotProps<ExternalProps>;
  /**
   * Resolver for the increment button slot's props.
   * @param externalProps props for the increment button slot
   * @returns props that should be spread on the increment button slot
   */
  getIncrementButtonProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseNumberInputIncrementButtonSlotProps<ExternalProps>;
  /**
   * Resolver for the input slot's props.
   * @param externalProps props for the input slot
   * @returns props that should be spread on the input slot
   */
  getInputProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseNumberInputInputSlotProps<ExternalProps>;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseNumberInputRootSlotProps<ExternalProps>;
  /**
   * If `true`, the `input` will indicate that it's required.
   * @default false
   */
  required: boolean;
  /**
   * The clamped `value` of the `input` element.
   */
  value: number | null;
  /**
   * The dirty `value` of the `input` element when it is in focus.
   */
  inputValue: string;
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
