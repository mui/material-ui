import * as React from 'react';

export interface UseTextboxInputParameters {
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
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClick?: React.MouseEventHandler;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required?: boolean;
  value?: unknown;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseTextboxInputSlotOwnProps {
  'aria-invalid': React.AriaAttributes['aria-invalid'];
  defaultValue: string | number | readonly string[] | undefined;
  ref: React.RefCallback<HTMLInputElement | HTMLTextAreaElement> | null;
  value: string | number | readonly string[] | undefined;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required: boolean;
  disabled: boolean;
}

export type UseTextboxInputSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseTextboxInputSlotOwnProps
> &
  UseTextboxInputSlotOwnProps;

export interface UseTextboxInputReturnValue {
  getProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps,
  ) => UseTextboxInputSlotProps<ExternalProps>;
  ref: React.RefCallback<HTMLInputElement> | null;
}
