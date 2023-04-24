import * as React from 'react';
import { FormControlState } from '../FormControl';

export interface UseInputParameters {
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
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  value?: unknown;
}

export interface UseInputRootSlotOwnProps {
  onClick: React.MouseEventHandler | undefined;
}

export type UseInputRootSlotProps<TOther = {}> = Omit<
  TOther,
  keyof UseInputRootSlotOwnProps | 'onBlur' | 'onChange' | 'onFocus'
> &
  UseInputRootSlotOwnProps;

export interface UseInputInputSlotOwnProps {
  'aria-invalid': React.AriaAttributes['aria-invalid'];
  defaultValue: string | number | readonly string[] | undefined;
  ref: React.Ref<HTMLInputElement>;
  value: string | number | readonly string[] | undefined;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  required: boolean;
  disabled: boolean;
}

export type UseInputInputSlotProps<TOther = {}> = Omit<TOther, keyof UseInputInputSlotOwnProps> &
  UseInputInputSlotOwnProps;

export interface UseInputReturnValue {
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
  ) => UseInputInputSlotProps<TOther>;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends Record<string, any> = {}>(
    externalProps?: TOther,
  ) => UseInputRootSlotProps<TOther>;
  /**
   * If `true`, the `input` will indicate that it's required.
   * @default false
   */
  required: boolean;
  /**
   * The `value` of the `input` element.
   */
  value: unknown;
}
