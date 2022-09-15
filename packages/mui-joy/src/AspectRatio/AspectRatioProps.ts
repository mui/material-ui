import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type AspectRatioSlot = 'root' | 'content';

export interface AspectRatioPropsColorOverrides {}
export interface AspectRatioPropsVariantOverrides {}

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, AspectRatioOwnerState>;
  content?: SlotComponentProps<'div', { sx?: SxProps }, AspectRatioOwnerState>;
}

export interface AspectRatioTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, AspectRatioPropsColorOverrides>;
    /**
     * Used to render icon or text elements inside the AspectRatio if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * The minimum calculated height of the element (not the CSS height).
     */
    minHeight?: number | string;
    /**
     * The maximum calculated height of the element (not the CSS height).
     */
    maxHeight?: number | string;
    /**
     * The CSS object-fit value of the first-child.
     */
    objectFit?: React.CSSProperties['objectFit'];
    /**
     * The aspect-ratio of the element. The current implementation uses padding instead of the CSS aspect-ratio due to browser support.
     * https://caniuse.com/?search=aspect-ratio
     * @default '16 / 9'
     */
    ratio?: number | string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, AspectRatioPropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type AspectRatioProps<
  D extends React.ElementType = AspectRatioTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<AspectRatioTypeMap<P, D>, D>;

export interface AspectRatioOwnerState extends AspectRatioProps {}
