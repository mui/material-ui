import { OverrideProps } from '@mui/types';
import * as React from 'react';
import { SlotComponentProps } from '../utils';

export interface MenuItemUnstyledComponentsPropsOverrides {}

export interface MenuItemUnstyledOwnerState extends MenuItemUnstyledOwnProps {
  disabled: boolean;
  focusVisible: boolean;
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
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component?: React.ElementType;
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components?: {
    Root?: React.ElementType;
  };
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  componentsProps?: {
    root?: SlotComponentProps<
      'li',
      MenuItemUnstyledComponentsPropsOverrides,
      MenuItemUnstyledOwnerState
    >;
  };
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label?: string;
}

export interface MenuItemUnstyledTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P & MenuItemUnstyledOwnProps;
  defaultComponent: D;
}

export type MenuItemUnstyledProps<
  D extends React.ElementType = MenuItemUnstyledTypeMap['defaultComponent'],
> = OverrideProps<MenuItemUnstyledTypeMap<{}, D>, D>;
