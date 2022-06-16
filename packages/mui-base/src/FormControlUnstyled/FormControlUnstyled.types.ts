import * as React from 'react';
import { OverrideProps, Simplify } from '@mui/types';
import { SlotComponentProps } from '../utils';

export type NativeFormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FormControlUnstyledComponentsPropsOverrides {}

export interface FormControlUnstyledOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode | ((state: FormControlUnstyledState) => React.ReactNode);
  /**
   * Class name applied to the root element.
   */
  className?: string;
  /**
   * The components used for each slot inside the FormControl.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  componentsProps?: {
    root?: SlotComponentProps<
      'div',
      FormControlUnstyledComponentsPropsOverrides,
      FormControlUnstyledOwnerState
    >;
  };
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
  onChange?: React.ChangeEventHandler<NativeFormControlElement>;
  /**
   * If `true`, the label will indicate that the `input` is required.
   * @default false
   */
  required?: boolean;
  value?: unknown;
}

export interface FormControlUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & FormControlUnstyledOwnProps;
  defaultComponent: D;
}

export type FormControlUnstyledProps<
  D extends React.ElementType = FormControlUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<FormControlUnstyledTypeMap<P, D>, D> & {
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: D;
};

type NonOptionalOwnerState = 'disabled' | 'error' | 'required';

export type FormControlUnstyledOwnerState = Simplify<
  Omit<FormControlUnstyledOwnProps, NonOptionalOwnerState> &
    Required<Pick<FormControlUnstyledProps, NonOptionalOwnerState>> & {
      filled: boolean;
      focused: boolean;
    }
>;

type ContextFromPropsKey = 'disabled' | 'error' | 'onChange' | 'required' | 'value';

export type FormControlUnstyledState = Simplify<
  Pick<FormControlUnstyledProps, ContextFromPropsKey> & {
    filled: boolean;
    focused: boolean;
    onBlur: () => void;
    onFocus: () => void;
  }
>;
