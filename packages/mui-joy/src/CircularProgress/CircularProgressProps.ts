import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type CircularProgressSlot = 'root' | 'svg' | 'circle1' | 'circle2';

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsSizeOverrides {}
export interface CircularProgressPropsVariantOverrides {}

export interface CircularProgressTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, CircularProgressPropsColorOverrides>;
    /**
     * The boolean to select a variant.
     * Use indeterminate when there is no progress value.
     * @default false
     */
    determinate?: true | false;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', CircularProgressPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The thickness of the circle.
     */
    thickness?: number;
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value?: number;
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, CircularProgressPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type CircularProgressProps<
  D extends React.ElementType = CircularProgressTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CircularProgressTypeMap<P, D>, D>;

export interface CircularProgressOwnerState extends CircularProgressProps {}
