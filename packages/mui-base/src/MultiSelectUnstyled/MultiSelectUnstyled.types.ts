import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import {
  SelectOption,
  SelectUnstyledCommonProps,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
} from '../SelectUnstyled';
import { SlotComponentProps } from '../utils';

export interface MultiSelectUnstyledComponentsPropsOverrides {}

export interface MultiSelectUnstyledOwnProps<TValue extends {}> extends SelectUnstyledCommonProps {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Listbox?: React.ElementType;
    Popper?: React.ComponentType<MultiSelectUnstyledPopperSlotProps<TValue>>;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<
      'button',
      MultiSelectUnstyledComponentsPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
    listbox?: SlotComponentProps<
      'button',
      MultiSelectUnstyledComponentsPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
    popper?: SlotComponentProps<
      typeof PopperUnstyled,
      MultiSelectUnstyledComponentsPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
  };
  /**
   * The default selected values. Use when the component is not controlled.
   * @default []
   */
  defaultValue?: TValue[];
  /**
   * A function to convert the currently selected values to a type accepted by HTML input.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected values can be posted with a form.
   */
  getSerializedValue?: (
    option: SelectOption<TValue>[],
  ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue[]) => void;
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  optionStringifier?: (option: SelectOption<TValue>) => string;
  /**
   * Function that customizes the rendering of the selected values.
   */
  renderValue?: (option: SelectOption<TValue>[]) => React.ReactNode;
  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value?: TValue[];
}

export interface MultiSelectUnstyledTypeMap<
  TValue extends {},
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & MultiSelectUnstyledOwnProps<TValue>;
  defaultComponent: D;
}

export type MultiSelectUnstyledProps<
  TValue extends {},
  D extends React.ElementType = MultiSelectUnstyledTypeMap<TValue>['defaultComponent'],
> = OverrideProps<MultiSelectUnstyledTypeMap<TValue, {}, D>, D> & {
  component?: D;
};

// OverridableComponent cannot be used below as MultiSelectUnstyled's props are generic.
export interface MultiSelectUnstyledType {
  <TValue extends {}, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<MultiSelectUnstyledTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends {}>(
    props: DefaultComponentProps<MultiSelectUnstyledTypeMap<TValue>>,
  ): JSX.Element | null;
  propTypes?: any;
}

export interface MultiSelectUnstyledOwnerState<TValue> extends MultiSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}

export type MultiSelectUnstyledRootSlotProps<TValue> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledListboxSlotProps<TValue> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledPopperSlotProps<TValue> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: PopperUnstyledProps['children'];
  className?: string;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: MultiSelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
