import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SelectUnstyledCommonProps } from '../SelectUnstyled';
import { SelectOption, UseSelectButtonSlotProps, UseSelectListboxSlotProps } from '../useSelect';
import { SlotComponentProps } from '../utils';

export interface MultiSelectUnstyledRootSlotPropsOverrides {}
export interface MultiSelectUnstyledListboxSlotPropsOverrides {}
export interface MultiSelectUnstyledPopperSlotPropsOverrides {}

export interface MultiSelectUnstyledOwnProps<TValue extends {}> extends SelectUnstyledCommonProps {
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
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: TValue[],
  ) => void;
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
   * The props used for each slot inside the MultiSelect.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'button',
      MultiSelectUnstyledRootSlotPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
    listbox?: SlotComponentProps<
      'button',
      MultiSelectUnstyledListboxSlotPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
    popper?: SlotComponentProps<
      typeof PopperUnstyled,
      MultiSelectUnstyledPopperSlotPropsOverrides,
      MultiSelectUnstyledOwnerState<TValue>
    >;
  };
  /**
   * The components used for each slot inside the MultiSelect.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: MultiSelectUnstyledSlots<TValue>;
  /**
   * The selected values.
   * Set to an empty array to deselect all options.
   */
  value?: TValue[];
}

export interface MultiSelectUnstyledSlots<TValue extends {}> {
  /**
   * The component used to render the root.
   * @default 'button'
   */
  root?: React.ElementType;
  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
  /**
   * The component used to render the popper.
   * @default PopperUnstyled
   */
  popper?: React.ComponentType<MultiSelectUnstyledPopperSlotProps<TValue>>;
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

export interface MultiSelectUnstyledOwnerState<TValue extends {}>
  extends MultiSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}

export type MultiSelectUnstyledRootSlotProps<TValue extends {}> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledListboxSlotProps<TValue extends {}> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledPopperSlotProps<TValue extends {}> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: PopperUnstyledProps['children'];
  className?: string;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: MultiSelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
