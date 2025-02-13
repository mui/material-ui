import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type CardOverflowSlot = 'root';

export interface CardOverflowSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type CardOverflowSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardOverflowSlots,
  {
    root: SlotProps<'div', {}, CardOverflowOwnerState>;
  }
>;

export interface CardOverflowPropsColorOverrides {}
export interface CardOverflowPropsVariantOverrides {}

export interface CardOverflowTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, CardOverflowPropsColorOverrides>;
    /**
     * Used to render icon or text elements inside the CardOverflow if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, CardOverflowPropsVariantOverrides>;
  } & CardOverflowSlotsAndSlotProps;
  defaultComponent: D;
}

export type CardOverflowProps<
  D extends React.ElementType = CardOverflowTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardOverflowTypeMap<P, D>, D>;

export interface CardOverflowOwnerState extends ApplyColorInversion<CardOverflowProps> {}
