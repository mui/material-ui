import * as React from 'react';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base/utils';
import { ColorPaletteProp, VariantProp, SxProps } from '../styles/types';

export type BadgeSlot = 'root' | 'badge';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export interface BadgePropsSizeOverrides {}

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

interface ComponentsProps {
  root?: SlotComponentProps<'div', { sx?: SxProps }, BadgeOwnerState>;
  badge?: SlotComponentProps<'div', { sx?: SxProps }, BadgeOwnerState>;
}

export interface BadgeTypeMap<D extends React.ElementType = 'span', P = {}> {
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
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactNode;
    /**
     * The inset of the badge. Support shorthand syntax as described in https://developer.mozilla.org/en-US/docs/Web/CSS/inset.
     * @default 0
     */
    badgeInset?: number | string;
    /**
     * The badge will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * The props used for each slot inside the component.
     * @default {}
     */
    componentsProps?: ComponentsProps;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<ColorPaletteProp, BadgePropsColorOverrides>;
    /**
     * If `true`, the badge is invisible.
     * @default false
     */
    invisible?: boolean;
    /**
     * Max count to show.
     * @default 99
     */
    max?: number;
    /**
     * The size of the component.
     * @default 'md'
     */
    size?: OverridableStringUnion<'sm' | 'md' | 'lg', BadgePropsSizeOverrides>;
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     * @default false
     */
    showZero?: boolean;
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
}

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<BadgeTypeMap<D, P>, D>;

export interface BadgeOwnerState extends BadgeProps {}
