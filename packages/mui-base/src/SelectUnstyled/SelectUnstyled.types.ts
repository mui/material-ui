import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import { SelectValue, UseSelectButtonSlotProps, UseSelectListboxSlotProps } from '../useSelect';
import { SelectOption } from '../useOption';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SlotComponentProps } from '../utils';

export interface SelectUnstyledRootSlotPropsOverrides {}
export interface SelectUnstyledListboxSlotPropsOverrides {}
export interface SelectUnstyledPopperSlotPropsOverrides {}

export interface SelectUnstyledOwnProps<TValue extends {}, Multiple extends boolean> {
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen?: boolean;
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: SelectValue<TValue, Multiple>;
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  getSerializedValue?: (
    option: SelectValue<SelectOption<TValue>, Multiple>,
  ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
  /**
   * `id` attribute of the listbox element.
   * Also used to derive the `id` attributes of options.
   */
  listboxId?: string;
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * If `true`, selecting multiple values is allowed.
   *
   * @default false
   */
  multiple?: Multiple;
  /**
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name?: string;
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (
    e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: SelectValue<TValue, Multiple>,
  ) => void;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
  /**
   * A function used to convert the option label to a string.
   * It's useful when labels are elements and need to be converted to plain text
   * to enable navigation using character keys on a keyboard.
   *
   * @default defaultOptionStringifier
   */
  optionStringifier?: (option: SelectOption<TValue>) => string;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectValue<SelectOption<TValue>, Multiple>) => React.ReactNode;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'button',
      SelectUnstyledRootSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue, Multiple>
    >;
    listbox?: SlotComponentProps<
      'ul',
      SelectUnstyledListboxSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue, Multiple>
    >;
    popper?: SlotComponentProps<
      typeof PopperUnstyled,
      SelectUnstyledPopperSlotPropsOverrides,
      SelectUnstyledOwnerState<TValue, Multiple>
    >;
  };
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: SelectUnstyledSlots<TValue, Multiple>;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: SelectValue<TValue, Multiple>;
}

export interface SelectUnstyledSlots<TValue extends {}, Multiple extends boolean> {
  /**
   * The component that renders the root.
   * @default 'button'
   */
  root?: React.ElementType;
  /**
   * The component that renders the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
  /**
   * The component that renders the popper.
   * @default PopperUnstyled
   */
  popper?: React.ComponentType<SelectUnstyledPopperSlotProps<TValue, Multiple>>;
}

export interface SelectUnstyledTypeMap<
  TValue extends {},
  Multiple extends boolean,
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & SelectUnstyledOwnProps<TValue, Multiple>;
  defaultComponent: D;
}

export type SelectUnstyledProps<
  TValue extends {},
  Multiple extends boolean,
  D extends React.ElementType = SelectUnstyledTypeMap<TValue, Multiple>['defaultComponent'],
> = OverrideProps<SelectUnstyledTypeMap<TValue, Multiple, {}, D>, D> & {
  component?: D;
};

// OverridableComponent cannot be used below as SelectUnstyled's props are generic.
export interface SelectUnstyledType {
  <TValue extends {}, C extends React.ElementType, Multiple extends boolean = false>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<SelectUnstyledTypeMap<TValue, Multiple>, C>,
  ): JSX.Element | null;
  <TValue extends {}, Multiple extends boolean = false>(
    props: DefaultComponentProps<SelectUnstyledTypeMap<TValue, Multiple>>,
  ): JSX.Element | null;
  propTypes?: any;
}

export interface SelectUnstyledOwnerState<TValue extends {}, Multiple extends boolean>
  extends SelectUnstyledOwnProps<TValue, Multiple> {
  active: boolean;
  disabled: boolean;
  focusVisible: boolean;
  open: boolean;
}

export type SelectUnstyledRootSlotProps<TValue extends {}, Multiple extends boolean> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue, Multiple>;
  }
>;

export type SelectUnstyledListboxSlotProps<TValue extends {}, Multiple extends boolean> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue, Multiple>;
  }
>;

export type SelectUnstyledPopperSlotProps<TValue extends {}, Multiple extends boolean> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: PopperUnstyledProps['children'];
  className?: string;
  keepMounted: PopperUnstyledProps['keepMounted'];
  open: boolean;
  ownerState: SelectUnstyledOwnerState<TValue, Multiple>;
  placement: PopperUnstyledProps['placement'];
};
