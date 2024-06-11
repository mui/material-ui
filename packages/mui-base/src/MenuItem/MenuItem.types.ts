import * as React from 'react';
import { Simplify } from '@mui/types';
import { PolymorphicProps, SlotComponentProps } from '../utils';
import { UseMenuItemRootSlotProps } from '../useMenuItem';

export interface MenuItemRootSlotPropsOverrides {}

export type MenuItemOwnerState = Simplify<
  MenuItemOwnProps & {
    disabled: boolean;
    focusVisible: boolean;
    highlighted: boolean;
  }
>;

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
  /**
   * If `true`, the menu item won't receive focus when the mouse moves over it.
   *
   * @default false
   */
  disableFocusOnHover?: boolean;
}

export interface MenuItemSlots {
  /**
   * The component that renders the root.
   * @default 'li'
   */
  root?: React.ElementType;
}

export interface MenuItemTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'li',
> {
  props: MenuItemOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type MenuItemProps<
  RootComponentType extends React.ElementType = MenuItemTypeMap['defaultComponent'],
> = PolymorphicProps<MenuItemTypeMap<{}, RootComponentType>, RootComponentType>;

export interface MenuItemState {
  disabled: boolean;
  highlighted: boolean;
}

export type MenuItemRootSlotProps = Simplify<
  UseMenuItemRootSlotProps & {
    children?: React.ReactNode;
    className: string;
    ref: React.Ref<HTMLElement>;
    ownerState: MenuItemOwnerState;
  }
>;
