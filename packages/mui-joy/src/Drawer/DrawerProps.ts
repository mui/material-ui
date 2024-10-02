import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, ApplyColorInversion } from '../styles/types';
import { ModalOwnProps } from '../Modal/ModalProps';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type DrawerSlot = 'root' | 'backdrop' | 'content';

export interface DrawerSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the backdrop.
   * @default 'div'
   */
  backdrop?: React.ElementType;
  /**
   * The component that renders the content of the drawer.
   * @default 'div'
   */
  content?: React.ElementType;
}

export interface DrawerPropsColorOverrides {}
export interface DrawerPropsSizeOverrides {}
export interface DrawerPropsVariantOverrides {}

export type DrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DrawerSlots,
  {
    root: SlotProps<'div', {}, DrawerOwnerState>;
    backdrop: SlotProps<'div', {}, DrawerOwnerState>;
    content: SlotProps<'div', {}, DrawerOwnerState>;
  }
>;

export interface DrawerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    Omit<ModalOwnProps, 'keepMounted' | 'children'> &
    DrawerSlotsAndSlotProps & {
      /**
       * Side from which the drawer will appear.
       * @default 'left'
       */
      anchor?: 'left' | 'top' | 'right' | 'bottom';
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, DrawerPropsColorOverrides>;
      /**
       * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
       * @default false
       */
      invertedColors?: boolean;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', DrawerPropsSizeOverrides>;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'plain'
       */
      variant?: OverridableStringUnion<VariantProp, DrawerPropsVariantOverrides>;
    };
  defaultComponent: D;
}

export type DrawerProps<
  D extends React.ElementType = DrawerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<DrawerTypeMap<P, D>, D>;

export interface DrawerOwnerState extends ApplyColorInversion<DrawerProps> {}
