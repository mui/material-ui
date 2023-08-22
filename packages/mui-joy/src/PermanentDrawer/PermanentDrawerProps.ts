import * as React from 'react';
import { OverrideProps, OverridableStringUnion } from '@mui/types';
import { SxProps, ApplyColorInversion, ColorPaletteProp, VariantProp } from '../styles/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export type PermanentDrawerSlot = 'root' | 'label' | 'action' | 'startDecorator' | 'endDecorator';

export interface PermanentDrawerSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
  /**
   * The component that renders the content of the drawer.
   * @default 'div'
   */
  content?: React.ElementType;
}

export interface PermanentDrawerPropsColorOverrides {}
export interface PermanentDrawerPropsSizeOverrides {}
export interface PermanentDrawerPropsVariantOverrides {}

export type PermanentDrawerSlotsAndSlotProps = CreateSlotsAndSlotProps<
  PermanentDrawerSlots,
  {
    root: SlotProps<'div', {}, PermanentDrawerOwnerState>;
    content: SlotProps<'div', {}, PermanentDrawerOwnerState>;
  }
>;

export interface PermanentDrawerTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    PermanentDrawerSlotsAndSlotProps & {
      /**
       * Side from which the drawer will appear.
       * @default 'left'
       */
      anchor?: 'left' | 'top' | 'right' | 'bottom';
      /**
       * The color of the component. It supports those theme colors that make sense for this component.
       * @default 'neutral'
       */
      color?: OverridableStringUnion<ColorPaletteProp, PermanentDrawerPropsColorOverrides>;
      /**
       * The size of the component.
       * @default 'md'
       */
      size?: OverridableStringUnion<'sm' | 'md' | 'lg', PermanentDrawerPropsSizeOverrides>;
      /**
       * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
       * @default 'outlined'
       */
      variant?: OverridableStringUnion<VariantProp, PermanentDrawerPropsVariantOverrides>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps;
    };
  defaultComponent: D;
}

export type PermanentDrawerProps<
  D extends React.ElementType = PermanentDrawerTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<PermanentDrawerTypeMap<P, D>, D>;

export interface PermanentDrawerOwnerState extends ApplyColorInversion<PermanentDrawerProps> {
  open: true;
}
