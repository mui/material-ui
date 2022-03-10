import { ExtendBadgeUnstyledTypeMap } from '@mui/base/BadgeUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { SxProps } from '../styles/defaultTheme';
import { ColorPaletteProp, VariantProp } from '../styles/types';

export type BadgeSlot = 'root' | 'badge';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export interface BadgePropsSizeOverrides {}

export type BadgeTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendBadgeUnstyledTypeMap<{
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<Exclude<ColorPaletteProp, 'context'>, BadgePropsColorOverrides>;
    /**
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', BadgePropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'contained'
     */
    variant?: OverridableStringUnion<Exclude<VariantProp, 'text'>, BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BadgeTypeMap<D, P>, D>;
