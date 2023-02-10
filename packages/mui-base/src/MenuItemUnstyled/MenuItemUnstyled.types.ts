import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SlotComponentProps } from '../utils';

export interface MenuItemUnstyledRootSlotPropsOverrides {}

export interface MenuItemUnstyledOwnerState extends MenuItemUnstyledOwnProps {
  disabled: boolean;
  focusVisible: boolean;
  highlighted: boolean;
}

export interface MenuItemUnstyledOwnProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<
      'li',
      MenuItemUnstyledRootSlotPropsOverrides,
      MenuItemUnstyledOwnerState
    >;
  };
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default { root: 'li' }
   */
  slots?: MenuItemUnstyledSlots;
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export interface MenuItemUnstyledSlots {
  /**
   * The component used to render the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export interface MenuItemUnstyledTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & MenuItemUnstyledOwnProps;
  defaultComponent: D;
}

export type MenuItemUnstyledProps<
  D extends React.ElementType = MenuItemUnstyledTypeMap['defaultComponent'],
> = OverrideProps<MenuItemUnstyledTypeMap<{}, D>, D> & {
  component?: D;
};
