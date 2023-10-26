import * as React from 'react';
import { Simplify } from '@mui/types';
import { PolymorphicProps, SlotComponentProps } from '../utils';

export type NativeFormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FormControlRootSlotPropsOverrides {}

export interface FormControlOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode | ((state: FormControlState) => React.ReactNode);
  /**
   * Class name applied to the root element.
   */
  className?: string;
  defaultValue?: unknown;
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;
  /**
   * Callback fired when the form element's value is modified.
   */
  onChange?: React.ChangeEventHandler<NativeFormControlElement>;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean;
  /**
   * The props used for each slot inside the FormControl.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', FormControlRootSlotPropsOverrides, FormControlOwnerState>;
  };
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: FormControlSlots;
  /**
   * The value of the form element.
   */
  value?: unknown;
}

export interface FormControlSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export interface FormControlTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: FormControlOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type FormControlProps<
  RootComponentType extends React.ElementType = FormControlTypeMap['defaultComponent'],
> = PolymorphicProps<FormControlTypeMap<{}, RootComponentType>, RootComponentType>;

type NonOptionalOwnerState = 'disabled' | 'error' | 'required';

export type FormControlOwnerState = Simplify<
  Omit<FormControlOwnProps, NonOptionalOwnerState> &
    Required<Pick<FormControlProps, NonOptionalOwnerState>> & {
      filled: boolean;
      focused: boolean;
    }
>;

export type FormControlState = {
  /**
   * If `true`, the label, input and helper text should be displayed in a disabled state.
   */
  disabled: boolean;
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: boolean;
  /**
   * If `true`, the form element has some value.
   */
  filled: boolean;
  /**
   * If `true`, the form element is focused and not disabled.
   */
  focused: boolean;
  /**
   * Callback fired when the form element has lost focus.
   */
  onBlur: () => void;
  /**
   * Callback fired when the form element's value is modified.
   */
  onChange: React.ChangeEventHandler<NativeFormControlElement>;
  /**
   * Callback fired when the form element receives focus.
   */
  onFocus: () => void;
  /**
   * If `true`, the label will indicate that the `input` is required.
   */
  required: boolean;
  /**
   * The value of the form element.
   */
  value: unknown;
};

export type FormControlRootSlotProps = {
  children: React.ReactNode | ((state: FormControlState) => React.ReactNode);
  className?: string;
  ownerState: FormControlOwnerState;
};

export interface UseFormControlContextReturnValue extends FormControlState {}
