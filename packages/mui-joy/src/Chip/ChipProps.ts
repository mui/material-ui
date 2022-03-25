import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type ChipSlot = 'root' | 'label' | 'startDecorator' | 'endDecorator'; 

export interface ChipPropsColorOverrides {}
export interface ChipPropsSizeOverrides {}
export interface ChipPropsVariantOverrides {}

export interface ChipTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * This prop isn't supported.
     * Use the `component` prop if you need to change the children structure.
     */
    children?: null;
    /**
     * If `true`, the chip will appear clickable, and will raise when pressed,
     * even if the onClick prop is not defined.
     * If `false`, the chip will not appear clickable, even if onClick prop is defined.
     * This can be used, for example,
     * along with the component prop to indicate an anchor Chip is clickable.
     * Note: this controls the UI and does not affect the onClick event.
     */
    clickable?: boolean;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, ChipPropsColorOverrides>;
    /**
     * If `true`, the component is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Element placed after the children.
     */
    endDecorator?: React.ReactNode;
    /**
     * The content of the component.
     */
    label?: React.ReactNode;
    /**
     * The size of the component.
     * It accepts theme values between 'sm' and 'lg'.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', ChipPropsSizeOverrides>;
    /**
     * Element placed before the children.
     */
    startDecorator?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'light'
     */
    variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, ChipPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type ChipProps<
  D extends React.ElementType = ChipTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<ChipTypeMap<P, D>, D>;
