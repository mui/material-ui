import * as React from 'react';
import { Simplify } from '@mui/types';
import { SelectValue, UseSelectButtonSlotProps, UseSelectListboxSlotProps } from '../useSelect';
import { SelectOption } from '../useOption';
import Popper, { PopperProps } from '../Popper';
import { PolymorphicProps, SlotComponentProps, WithOptionalOwnerState } from '../utils';

export interface SelectRootSlotPropsOverrides {}
export interface SelectListboxSlotPropsOverrides {}
export interface SelectPopperSlotPropsOverrides {}

export interface SelectOwnProps<OptionValue extends {}, Multiple extends boolean> {
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
  defaultValue?: SelectValue<OptionValue, Multiple>;
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
    option: SelectValue<SelectOption<OptionValue>, Multiple>,
  ) => React.InputHTMLAttributes<HTMLInputElement>['value'];
  /**
   * `id` attribute of the listbox element.
   */
  listboxId?: string;
  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * If `true`, selecting multiple values is allowed.
   * This affects the type of the `value`, `defaultValue`, and `onChange` props.
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
    event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: SelectValue<OptionValue, Multiple>,
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
  getOptionAsString?: (option: SelectOption<OptionValue>) => string;
  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue?: (option: SelectValue<SelectOption<OptionValue>, Multiple>) => React.ReactNode;
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'button',
      SelectRootSlotPropsOverrides,
      SelectOwnerState<OptionValue, Multiple>
    >;
    listbox?: SlotComponentProps<
      'ul',
      SelectListboxSlotPropsOverrides,
      SelectOwnerState<OptionValue, Multiple>
    >;
    popper?: SlotComponentProps<
      typeof Popper,
      SelectPopperSlotPropsOverrides,
      SelectOwnerState<OptionValue, Multiple>
    >;
  };
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: SelectSlots<OptionValue, Multiple>;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: SelectValue<OptionValue, Multiple>;
}

export interface SelectSlots<OptionValue extends {}, Multiple extends boolean> {
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
   * @default Popper
   */
  popper?: React.ComponentType<
    WithOptionalOwnerState<SelectPopperSlotProps<OptionValue, Multiple>>
  >;
}

export interface SelectTypeMap<
  OptionValue extends {},
  Multiple extends boolean,
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'button',
> {
  props: SelectOwnProps<OptionValue, Multiple> & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type SelectProps<
  OptionValue extends {},
  Multiple extends boolean,
  RootComponentType extends React.ElementType = SelectTypeMap<
    OptionValue,
    Multiple
  >['defaultComponent'],
> = PolymorphicProps<
  SelectTypeMap<OptionValue, Multiple, {}, RootComponentType>,
  RootComponentType
>;

// OverridableComponent cannot be used below as Select's props are generic.
export interface SelectType {
  <
    OptionValue extends {},
    Multiple extends boolean = false,
    RootComponentType extends React.ElementType = SelectTypeMap<
      OptionValue,
      Multiple
    >['defaultComponent'],
  >(
    props: PolymorphicProps<SelectTypeMap<OptionValue, Multiple>, RootComponentType>,
  ): JSX.Element | null;
  propTypes?: any;
  displayName?: string | undefined;
}

export type SelectOwnerState<OptionValue extends {}, Multiple extends boolean> = Simplify<
  SelectOwnProps<OptionValue, Multiple> & {
    active: boolean;
    disabled: boolean;
    focusVisible: boolean;
    open: boolean;
  }
>;

export type SelectRootSlotProps<OptionValue extends {}, Multiple extends boolean> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectOwnerState<OptionValue, Multiple>;
  }
>;

export type SelectListboxSlotProps<OptionValue extends {}, Multiple extends boolean> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectOwnerState<OptionValue, Multiple>;
  }
>;

export type SelectPopperSlotProps<OptionValue extends {}, Multiple extends boolean> = {
  anchorEl: PopperProps['anchorEl'];
  children?: PopperProps['children'];
  className?: string;
  keepMounted: PopperProps['keepMounted'];
  open: boolean;
  ownerState: SelectOwnerState<OptionValue, Multiple>;
  placement: PopperProps['placement'];
};
