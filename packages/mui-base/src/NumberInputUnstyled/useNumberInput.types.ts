import * as React from 'react';

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

export interface UseNumberInputInputSlotOwnProps {
  defaultValue: number | undefined;
  ref: React.Ref<HTMLInputElement>;
  value: number | undefined;
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
