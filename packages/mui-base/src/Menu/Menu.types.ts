import * as React from 'react';
import { Simplify } from '@mui/types';
import { PolymorphicProps, SlotComponentProps } from '../utils';
import { UseMenuListboxSlotProps } from '../useMenu';
import { ListAction } from '../useList';
import { PopupProps } from '../Unstable_Popup';

export interface MenuRootSlotPropsOverrides {}
export interface MenuListboxSlotPropsOverrides {}

export interface MenuActions {
  /**
   * Dispatches an action that can cause a change to the menu's internal state.
   */
  dispatch: (action: ListAction<string>) => void;
  /**
   * Resets the highlighted item.
   */
  resetHighlight: () => void;
}

export interface MenuOwnProps {
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions?: React.Ref<MenuActions>;
  /**
   * The element based on which the menu is positioned.
   */
  anchor?: PopupProps['anchor'];
  children?: React.ReactNode;
  className?: string;
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange?: (items: string[]) => void;
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps?: {
    root?: SlotComponentProps<'div', MenuRootSlotPropsOverrides & PopupProps, MenuOwnerState>;
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
   * The component that renders the popup element.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the listbox.
   * @default 'ul'
   */
  listbox?: React.ElementType;
}

export interface MenuTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: MenuOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type MenuProps<
  RootComponentType extends React.ElementType = MenuTypeMap['defaultComponent'],
> = PolymorphicProps<MenuTypeMap<{}, RootComponentType>, RootComponentType>;

export type MenuOwnerState = Simplify<
  MenuOwnProps & {
    open: boolean;
  }
>;

export type MenuRootSlotProps = {
  children?: React.ReactNode;
  className?: string;
  ownerState: MenuOwnerState;
  ref: React.Ref<any>;
};

export type MenuListboxSlotProps = UseMenuListboxSlotProps & {
  children?: React.ReactNode;
  className?: string;
  ownerState: MenuOwnerState;
};
