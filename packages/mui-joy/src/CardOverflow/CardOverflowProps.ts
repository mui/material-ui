import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type CardOverflowSlot = 'root';

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
     * The variant to use.
     * @default 'plain'
     */
    variant?: OverridableStringUnion<VariantProp, CardOverflowPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type CardOverflowProps<
  D extends React.ElementType = CardOverflowTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CardOverflowTypeMap<P, D>, D>;
