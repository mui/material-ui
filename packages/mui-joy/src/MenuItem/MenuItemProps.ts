import * as React from 'react';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '@mui/types';
import { ListItemButtonProps } from '../ListItemButton/ListItemButtonProps';

export type MenuItemSlot = 'root';

export interface MenuItemPropsVariantOverrides {}

export interface MenuItemPropsColorOverrides {}

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & ListItemButtonProps;
  defaultComponent: D;
}

export interface ExtendMenuItemTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & MenuItemTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export interface MenuItemOwnerState extends MenuItemProps {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible: boolean;
}

export type ExtendMenuItem<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendMenuItemTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendMenuItemTypeMap<M>>;
