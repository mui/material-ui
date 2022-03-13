import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverridableTypeMap,
  OverrideProps,
} from '@mui/types';
import { ListItemButtonProps } from '../ListItemButton';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type MenuItemSlot = 'root';

export interface MenuItemPropsVariantOverrides {}

export interface MenuItemPropsColorOverrides {}

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    ListItemButtonProps & {
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       */
      color?: OverridableStringUnion<ColorPaletteProp, MenuItemPropsColorOverrides>;
      /**
       * The variant to use.
       * @default 'text'
       */
      variant?: OverridableStringUnion<VariantProp, MenuItemPropsVariantOverrides>;
    };
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

export type ExtendMenuItem<M extends OverridableTypeMap> = ((
  props: OverrideProps<ExtendMenuItemTypeMap<M>, 'a'>,
) => JSX.Element) &
  OverridableComponent<ExtendMenuItemTypeMap<M>>;
