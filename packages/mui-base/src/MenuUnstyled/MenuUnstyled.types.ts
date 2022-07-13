import { OverrideProps } from '@mui/types';
import React from 'react';
import PopperUnstyled, { PopperUnstyledProps } from '../PopperUnstyled';
import { SlotComponentProps } from '../utils';
import { UseMenuListboxSlotProps } from './useMenu.types';

export interface MenuUnstyledComponentsPropsOverrides {}

export interface MenuUnstyledActions {
  highlightFirstItem: () => void;
  highlightLastItem: () => void;
}

export interface MenuUnstyledOwnProps {
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
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
    Listbox?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
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

export interface MenuUnstyledTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & MenuUnstyledOwnProps;
  defaultComponent: D;
}

export type MenuUnstyledProps<
  D extends React.ElementType = MenuUnstyledTypeMap['defaultComponent'],
> = OverrideProps<MenuUnstyledTypeMap<{}, D>, D>;

export interface MenuUnstyledOwnerState extends MenuUnstyledOwnProps {
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
