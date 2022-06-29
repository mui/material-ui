import * as React from 'react';
import { ExtendBadgeUnstyledTypeMap } from '@mui/base/BadgeUnstyled';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type BadgeSlot = 'root' | 'badge';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export interface BadgePropsSizeOverrides {}

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export type BadgeTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendBadgeUnstyledTypeMap<{
  props: P & {
    /**
     * The anchor of the badge.
     * @default {
     *   vertical: 'top',
     *   horizontal: 'right',
     * }
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * The inset of the badge. Support shorthand syntax as described in https://developer.mozilla.org/en-US/docs/Web/CSS/inset.
     * @default 0
     */
    badgeInset?: number | string;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, BadgePropsColorOverrides>;
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
     * @default 'solid'
     */
    variant?: OverridableStringUnion<VariantProp, BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BadgeTypeMap<D, P>, D>;
