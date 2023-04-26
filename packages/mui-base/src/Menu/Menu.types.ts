import { OverrideProps } from '@mui/types';
import * as React from 'react';
import Popper, { PopperProps } from '../Popper';
import { SlotComponentProps } from '../utils';
import { UseMenuListboxSlotProps } from '../useMenu';
import { ListAction } from '../useList';

export interface MenuRootSlotPropsOverrides {}
export interface MenuListboxSlotPropsOverrides {}

export interface MenuActions {
  dispatch: (action: ListAction<string>) => void;
}

export interface MenuOwnProps {
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions?: React.Ref<MenuActions>;
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl?: PopperProps['anchorEl'];
  children?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  listboxId?: string;
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open?: boolean;
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<typeof Popper, MenuRootSlotPropsOverrides, MenuOwnerState>;
    listbox?: SlotComponentProps<'ul', MenuListboxSlotPropsOverrides, MenuOwnerState>;
  };
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: MenuSlots;
}

export interface MenuSlots {
  /**
   * The component that renders the root.
   * @default Popper
   */
  root?: React.ElementType;
  /**
   * The component that renders the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
}

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & MenuOwnProps;
  defaultComponent: D;
}

export type MenuProps<D extends React.ElementType = MenuTypeMap['defaultComponent']> =
  OverrideProps<MenuTypeMap<{}, D>, D> & {
    component?: D;
  };

export interface MenuOwnerState extends MenuOwnProps {
  open: boolean;
}

export type MenuRootSlotProps = {
  anchorEl: PopperProps['anchorEl'];
  children?: React.ReactNode;
  className?: string;
  keepMounted: PopperProps['keepMounted'];
  open: boolean;
  ownerState: MenuOwnerState;
  ref: React.Ref<any>;
};

export type MenuListboxSlotProps = UseMenuListboxSlotProps & {
  className: string | undefined;
  ownerState: MenuOwnerState;
};
