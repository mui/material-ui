import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type MenuListSlot = 'root';

export interface MenuListPropsSizeOverrides {}
export interface MenuListPropsColorOverrides {}
export interface MenuListPropsVariantOverrides {}

export interface MenuActions extends MenuUnstyledActions {}

export interface MenuListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {
    /**
     * A ref with imperative actions.
     * It allows to select the first or last menu item.
     */
    actions?: React.Ref<MenuUnstyledActions>;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, MenuListPropsColorOverrides>;
    /**
     * The size of the component (affect other nested list* components because the `Menu` inherits `List`).
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', MenuListPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, MenuListPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type MenuListProps<
  D extends React.ElementType = MenuListTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType;
  },
> = OverrideProps<MenuListTypeMap<P, D>, D>;
