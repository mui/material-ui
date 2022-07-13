import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { SheetProps } from '../Sheet';
import { ListProps } from '../List';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type MenuSlot = 'root' | 'listbox';

export interface MenuPropsSizeOverrides {}
export interface MenuPropsColorOverrides {}
export interface MenuPropsVariantOverrides {}

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<PopperUnstyledProps, 'children' | 'open'> &
    Omit<SheetProps, 'variant' | 'color'> & {
      /**
       * A ref with imperative actions.
       * It allows to select the first or last menu item.
       */
      actions?: React.Ref<MenuUnstyledActions>;
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, MenuPropsColorOverrides>;
      componentsProps?: {
        root?: React.ComponentPropsWithRef<'div'>;
        listbox?: ListProps;
      };
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
      /**
       * The size of the component (affect other nested list* components because the `Menu` inherits `List`).
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', MenuPropsSizeOverrides>;
      /**
       * The variant to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, MenuPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type MenuProps<
  D extends React.ElementType = MenuTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MenuTypeMap<P, D>, D>;
