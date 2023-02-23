import * as React from 'react';
import { FormControlState } from '../FormControl';

export type UseNumberInputChangeHandler = (
  e: React.KeyboardEvent<HTMLInputElement>,
  value: number | null,
) => void;

export interface UseNumberInputParameters {
  // props for number specific features
  min?: number;
  max?: number;
  step?: number;
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
  onBlur?: React.FocusEventHandler;
  onClick?: React.MouseEventHandler;
  onChange?: UseNumberInputChangeHandler;
  onFocus?: React.FocusEventHandler;
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
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
  onChange: UseNumberInputChangeHandler;
  onFocus: React.FocusEventHandler;
  required: boolean;
  disabled: boolean;
}

export type UseNumberInputInputSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseNumberInputInputSlotOwnProps
> &
  UseNumberInputInputSlotOwnProps;

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
}
