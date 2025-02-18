import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps, ApplyColorInversion } from '../styles/types';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';

export type CardSlot = 'root';

export interface CardSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType;
}

export type CardSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardSlots,
  {
    root: SlotProps<'div', {}, CardOwnerState>;
  }
>;

export interface CardPropsColorOverrides {}
export interface CardPropsVariantOverrides {}
export interface CardPropsSizeOverrides {}

export interface CardTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * Used to render icon or text elements inside the Card if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, CardPropsColorOverrides>;
    /**
     * If `true`, the children with an implicit color prop invert their colors to match the component's variant and color.
     * @default false
     */
    invertedColors?: boolean;
    /**
     * The component orientation.
     * @default 'vertical'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', CardPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
     * @default 'outlined'
     */
    variant?: OverridableStringUnion<VariantProp, CardPropsVariantOverrides>;
  } & CardSlotsAndSlotProps;
  defaultComponent: D;
}

export type CardProps<
  D extends React.ElementType = CardTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardTypeMap<P, D>, D>;

export interface CardOwnerState extends ApplyColorInversion<CardProps> {}
