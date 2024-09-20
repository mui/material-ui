import * as React from 'react';

export interface UseSwitchParameters {
  /**
   * If `true`, the component is checked.
   */
  checked?: boolean;
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  onBlur?: React.FocusEventHandler;
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler;
  onFocusVisible?: React.FocusEventHandler;
  /**
   * If `true`, the component is read only.
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
}

interface UseSwitchInputSlotOwnProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler;
  readOnly?: boolean;
  ref: React.RefCallback<HTMLInputElement> | null;
  required?: boolean;
  type: React.HTMLInputTypeAttribute;
}

export type UseSwitchInputSlotProps<TOther = {}> = Omit<TOther, keyof UseSwitchInputSlotOwnProps> &
  UseSwitchInputSlotOwnProps;

export interface UseSwitchReturnValue {
  /**
   * If `true`, the component will be checked.
   */
  checked: boolean;
  /**
   * If `true`, the component will be disabled.
   */
  disabled: boolean;
  /**
   * If `true`, it indicates that the component is being focused using keyboard.
   */
  focusVisible: boolean;
  /**
   * Resolver for the input slot's props.
   * @param externalProps props for the input slot
   * @returns props that should be spread on the input slot
   */
  getInputProps: (
    externalProps?: React.HTMLAttributes<HTMLInputElement>,
  ) => UseSwitchInputSlotProps;
  /**
   * Ref to the input slot's DOM node.
   */
  inputRef: React.RefCallback<HTMLInputElement> | null;
  /**
   * If `true`, the component will be read only.
   */
  readOnly: boolean;
}
