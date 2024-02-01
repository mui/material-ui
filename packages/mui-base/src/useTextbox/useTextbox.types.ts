import * as React from 'react';
import { FormControlState } from '../FormControl';

export interface UseTextboxParameters {
  inputRef: React.RefObject<HTMLElement> | null;
  defaultValue?: unknown;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  value?: unknown;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export interface UseTextboxRootSlotOwnProps {
  onClick: React.MouseEventHandler | undefined;
}

export type UseTextboxRootSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseTextboxRootSlotOwnProps | 'onBlur' | 'onChange' | 'onFocus'
> &
  UseTextboxRootSlotOwnProps;

export interface UseTextboxReturnValue {
  defaultValue?: unknown;
  /**
   * If `true`, the component will be disabled.
   */
  disabled: boolean;
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute.
   */
  error: boolean;
  /**
   * If `true`, the `input` will be focused.
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
  getProps: <ExternalProps extends Record<string, any> = {}>(
    externalProps?: ExternalProps,
  ) => UseTextboxRootSlotProps<ExternalProps>;

  /**
   * If `true`, the `input` will indicate that it's required.
   */
  required: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  /**
   * The `value` of the `input` element.
   */
  value: unknown;
}
