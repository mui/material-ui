import * as React from 'react';
import { DefaultComponentProps, OverrideProps, Simplify } from '@mui/types';
import {
  SelectOption,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
} from './useSelect.types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SlotComponentProps } from '../utils';

export interface SelectUnstyledComponentsPropsOverrides {}

export interface SelectUnstyledCommonProps {
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen?: boolean;
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
   * Name of the element. For example used by the server to identify the fields in form submits.
   * If the name is provided, the component will render a hidden input element that can be submitted to a server.
   */
  name?: string;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
}

export interface SelectUnstyledOwnProps<TValue extends {}> extends SelectUnstyledCommonProps {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Listbox?: React.ElementType;
    Popper?: React.ComponentType<SelectUnstyledPopperSlotProps<TValue>>;
  };
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<
      'button',
      SelectUnstyledComponentsPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
    listbox?: SlotComponentProps<
      'button',
      SelectUnstyledComponentsPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
    popper?: SlotComponentProps<
      typeof PopperUnstyled,
      SelectUnstyledComponentsPropsOverrides,
      SelectUnstyledOwnerState<TValue>
    >;
  };
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;
  /**
   * A function to convert the currently selected value to a string.
   * Used to set a value of a hidden input associated with the select,
   * so that the selected value can be posted with a form.
   */
  formValueProvider?: (option: SelectOption<TValue> | null) => string | number;
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue | null) => void;
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
  renderValue?: (option: SelectOption<TValue> | null) => React.ReactNode;
  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value?: TValue | null;
}

export interface SelectUnstyledTypeMap<
  TValue extends {},
  P = {},
  D extends React.ElementType = 'button',
> {
  props: P & SelectUnstyledOwnProps<TValue>;
  defaultComponent: D;
}

export type SelectUnstyledProps<
  TValue extends {},
  D extends React.ElementType = SelectUnstyledTypeMap<TValue>['defaultComponent'],
> = OverrideProps<SelectUnstyledTypeMap<TValue, {}, D>, D> & {
  component?: D;
};

// OverridableComponent cannot be used below as SelectUnstyled's props are generic.
export interface SelectUnstyledType {
  <TValue extends {}, C extends React.ElementType>(
    props: {
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: C;
    } & OverrideProps<SelectUnstyledTypeMap<TValue>, C>,
  ): JSX.Element | null;
  <TValue extends {}>(
    props: DefaultComponentProps<SelectUnstyledTypeMap<TValue>>,
  ): JSX.Element | null;
  propTypes?: any;
}

export interface SelectUnstyledOwnerState<TValue> extends SelectUnstyledOwnProps<TValue> {
  active: boolean;
  disabled: boolean;
  focusVisible: boolean;
  open: boolean;
}

export type SelectUnstyledRootSlotProps<TValue> = Simplify<
  UseSelectButtonSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledListboxSlotProps<TValue> = Simplify<
  UseSelectListboxSlotProps & {
    className?: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledPopperSlotProps<TValue> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: PopperUnstyledProps['children'];
  className?: string;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: SelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
