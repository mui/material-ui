import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import { MenuUnstyledActions } from '@mui/base/MenuUnstyled';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type MenuSlot = 'root';

export interface MenuSlots {
  /**
   * The component that renders the root.
   * @default 'ul'
   */
  root: React.ElementType;
}

export type MenuSlotsAndSlotProps = CreateSlotsAndSlotProps<
  MenuSlots,
  {
    root: SlotProps<'ul', {}, MenuOwnerState>;
  }
>;

export interface MenuPropsSizeOverrides {}
export interface MenuPropsColorOverrides {}
export interface MenuPropsVariantOverrides {}

export type { MenuUnstyledActions } from '@mui/base/MenuUnstyled';

export interface MenuTypeMap<P = {}, D extends React.ElementType = 'ul'> {
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
    color?: OverridableStringUnion<ColorPaletteProp, MenuPropsColorOverrides>;
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
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', MenuPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, MenuPropsVariantOverrides>;
  } & MenuSlotsAndSlotProps &
    Omit<PopperUnstyledProps, 'children' | 'open'>;
  defaultComponent: D;
}

export type MenuProps<
  D extends React.ElementType = MenuTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<MenuTypeMap<P, D>, D>;

export interface MenuOwnerState extends ApplyColorInversion<MenuProps> {}
