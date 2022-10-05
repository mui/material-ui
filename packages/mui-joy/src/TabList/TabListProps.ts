import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type TabListSlot = 'root';

export interface TabListColorOverrides {}

export interface TabListVariantOverrides {}

export interface TabListSizeOverrides {}

export interface TabListTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'neutral'
     */
    color?: OverridableStringUnion<ColorPaletteProp, TabListColorOverrides>;
    /**
     * Used to render icon or text elements inside the TabList if `src` is not set.
     * This can be an element, or just a string.
     */
    children?: React.ReactNode;
    /**
     * The size of the component.
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', TabListSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'soft'
     */
    variant?: OverridableStringUnion<VariantProp, TabListVariantOverrides>;
  };
  defaultComponent: D;
}

export type TabListProps<
  D extends React.ElementType = TabListTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<TabListTypeMap<P, D>, D>;

export type TabListOwnerState = TabListProps & {
  /**
   * If `true`, the Tabs' direction is "rtl".
   */
  isRtl: boolean;
  /**
   * The orientation of the Tabs.
   */
  orientation: 'horizontal' | 'vertical';
};
