import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';
import { DrawerProps } from '../Drawer/DrawerProps';

export type DrawerContentSlot = 'root';

export interface DrawerContentSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type DrawerContentSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerContentSlots,
  {
    root: SlotProps<'div', {}, DrawerContentOwnerState>;
  }
>;

export interface DrawerContentPropsColorOverrides {}
export interface DrawerContentPropsVariantOverrides {}
export interface DrawerContentPropsSizeOverrides {}
export interface DrawerContentPropsLayoutOverrides {}

export interface DrawerContentTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, DrawerContentPropsColorOverrides>;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', DrawerContentPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, DrawerContentPropsVariantOverrides>;
  } & DrawerContentSlotsAndSlotProps;
  defaultComponent: D;
}

export type DrawerContentProps<
  D extends React.ElementType = DrawerContentTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DrawerContentTypeMap<P, D>, D>;

export interface DrawerContentOwnerState extends ApplyColorInversion<DrawerContentProps> {
  open?: DrawerProps['open'];
  anchor?: DrawerProps['anchor'];
}
