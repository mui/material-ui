import * as React from 'react';
import { Simplify } from '@mui/types';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import {
  SelectOption,
  SelectUnstyledCommonProps,
  UseSelectButtonSlotProps,
  UseSelectListboxSlotProps,
} from '../SelectUnstyled';
import { SlotComponentProps } from '../utils';

export interface MultiSelectUnstyledComponentsPropsOverrides {}

export interface MultiSelectUnstyledProps<TValue extends {}> extends SelectUnstyledCommonProps {
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
   * Callback fired when an option is selected.
   */
  onChange?: (value: TValue[]) => void;
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

export interface MultiSelectUnstyledOwnerState<TValue> extends MultiSelectUnstyledProps<TValue> {
  active: boolean;
  disabled: boolean;
  open: boolean;
  focusVisible: boolean;
}

export type MultiSelectUnstyledRootSlotProps<TValue> = Simplify<
  UseSelectButtonSlotProps & {
    className: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledListboxSlotProps<TValue> = Simplify<
  UseSelectListboxSlotProps & {
    className: string;
    children?: React.ReactNode;
    ownerState: MultiSelectUnstyledOwnerState<TValue>;
  }
>;

export type MultiSelectUnstyledPopperSlotProps<TValue> = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: React.ReactNode;
  className: string | undefined;
  disablePortal: PopperUnstyledProps['disablePortal'];
  open: boolean;
  ownerState: MultiSelectUnstyledOwnerState<TValue>;
  placement: PopperUnstyledProps['placement'];
};
