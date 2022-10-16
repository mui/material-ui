import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type CardSlot = 'root';

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
     * If `true`, flex direction is set to 'row'.
     * @default false
     */
    row?: boolean;
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
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, CardPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type CardProps<
  D extends React.ElementType = CardTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardTypeMap<P, D>, D>;

export interface CardOwnerState extends CardProps {}
