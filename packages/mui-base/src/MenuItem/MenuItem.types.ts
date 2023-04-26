import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SlotComponentProps } from '../utils';

export interface MenuItemRootSlotPropsOverrides {}

export interface MenuItemOwnerState extends MenuItemOwnProps {
  disabled: boolean;
  focusVisible: boolean;
  highlighted: boolean;
}

export interface MenuItemOwnProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: MenuItemSlots;
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'li', MenuItemRootSlotPropsOverrides, MenuItemOwnerState>;
  };
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export interface MenuItemSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & MenuItemOwnProps;
  defaultComponent: D;
}

export type MenuItemProps<D extends React.ElementType = MenuItemTypeMap['defaultComponent']> =
  OverrideProps<MenuItemTypeMap<{}, D>, D> & {
    component?: D;
  };

export interface MenuItemState {
  disabled: boolean;
  highlighted: boolean;
}
