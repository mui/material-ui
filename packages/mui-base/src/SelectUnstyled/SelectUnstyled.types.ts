import * as React from 'react';
import { Simplify } from '@mui/types';
import {
  SelectOption,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
} from './useSelect.types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';

export interface SelectUnstyledComponentsPropsOverrides {}

export interface SelectUnstyledCommonProps {
  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
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
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen?: boolean;
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange?: (isOpen: boolean) => void;
}

export interface SelectUnstyledProps<TValue extends {}> extends SelectUnstyledCommonProps {
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
    root?: React.ComponentPropsWithRef<'button'> & SelectUnstyledComponentsPropsOverrides;
    listbox?: React.ComponentPropsWithRef<'ul'> & SelectUnstyledComponentsPropsOverrides;
    // PopperUnstyled has a required prop: open, but it is not necessary to provide it in componentsProps.
    popper?: Partial<React.ComponentPropsWithRef<typeof PopperUnstyled>> &
      SelectUnstyledComponentsPropsOverrides;
  };
  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue?: TValue | null;
  /**
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue | null) => void;
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

export interface SelectUnstyledOwnerState<TValue> extends SelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  focusVisible: boolean;
  open: boolean;
}

export type SelectUnstyledRootSlotProps<TValue> = Simplify<
  UseSelectButtonSlotProps & {
    className: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledListboxSlotProps<TValue> = Simplify<
  UseSelectListboxSlotProps & {
    className: string;
    children?: React.ReactNode;
    ownerState: SelectUnstyledOwnerState<TValue>;
  }
>;

export type SelectUnstyledPopperSlotProps<TValue> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: React.ReactNode;
  className: string | undefined;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: SelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
