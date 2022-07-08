import React from 'react';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SlotComponentProps } from '../utils';
import { UseMenuListboxSlotProps } from './useMenu.types';

export interface MenuUnstyledComponentsPropsOverrides {}

export interface MenuUnstyledActions {
  highlightFirstItem: () => void;
  highlightLastItem: () => void;
}

export interface MenuUnstyledProps {
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions?: React.Ref<MenuUnstyledActions>;
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl?: PopperUnstyledProps['anchorEl'];
  children?: React.ReactNode;
  className?: string;
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
    Listbox?: React.ElementType;
  };
  componentsProps?: {
    root?: SlotComponentProps<
      typeof PopperUnstyled,
      MenuUnstyledComponentsPropsOverrides,
      MenuUnstyledOwnerState
    >;
    listbox?: SlotComponentProps<
      'ul',
      MenuUnstyledComponentsPropsOverrides,
      MenuUnstyledOwnerState
    >;
  };
  /**
   * Always keep the menu in the DOM.
   * This prop can be useful in SEO situation or when you want to maximize the responsiveness of the Menu.
   *
   * @default false
   */
  keepMounted?: boolean;
  listboxId?: string;
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onClose?: () => void;
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open?: boolean;
}

export interface MenuUnstyledOwnerState extends MenuUnstyledProps {
  open: boolean;
}

export type MenuUnstyledRootSlotProps = {
  anchorEl: PopperUnstyledProps['anchorEl'];
  children?: React.ReactNode;
  className?: string;
  keepMounted: PopperUnstyledProps['keepMounted'];
  open: boolean;
  ownerState: MenuUnstyledOwnerState;
  ref: React.Ref<any>;
};

export type MenuUnstyledListboxSlotProps = UseMenuListboxSlotProps & {
  className: string | undefined;
  ownerState: MenuUnstyledOwnerState;
};
