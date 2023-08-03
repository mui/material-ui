import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import { SlotComponentProps } from '@mui/base';
import { Theme } from '../styles';
import { BadgeClasses } from './badgeClasses';

export interface BadgePropsSizeOverrides {}

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root?: React.ElementType;
  /**
   * The component that renders the badge.
   * @default 'span'
   */
  badge?: React.ElementType;
}

export interface BadgeTypeMap<
  DefaultComponent extends React.ElementType = 'span',
  AdditionalProps = {},
> {
  props: AdditionalProps & {
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
     * The badge will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BadgeClasses>;
    /**
     * @ignore
     */
    className?: string;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'error'
     */
    color?: OverridableStringUnion<
      'primary' | 'secondary' | 'tertiary' | 'error' | 'info' | 'warning' | 'success',
      BadgePropsColorOverrides
    >;
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
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     * @default false
     */
    showZero?: boolean;
    /**
     * The props used for each slot inside the Badge.
     * @default {}
     */
    slotProps?: {
      root?: SlotComponentProps<'span', {}, BadgeOwnerState>;
      badge?: SlotComponentProps<'span', {}, BadgeOwnerState>;
    };
    /**
     * The components used for each slot inside the Badge.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    slots?: BadgeSlots;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The size to use.
     * @default 'large'
     */
    size?: OverridableStringUnion<'small' | 'large', BadgePropsSizeOverrides>;
    /**
     * The variant to use.
     * @default 'standard'
     * @deprecated Use `size = 'small' | 'large'` instead
     */
    variant?: OverridableStringUnion<'dot' | 'standard', BadgePropsVariantOverrides>;
  };
  defaultComponent: DefaultComponent;
}

export type BadgeProps<
  RootComponent extends React.ElementType = BadgeTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BadgeTypeMap<RootComponent, AdditionalProps>, RootComponent>;

export interface BadgeOwnerState extends BadgeProps {
  size: NonNullable<BadgeProps['size']>;
  variant: NonNullable<BadgeProps['variant']>;
  anchorOrigin: NonNullable<BadgeProps['anchorOrigin']>;
  overlap: NonNullable<BadgeProps['overlap']>;
  color: NonNullable<BadgeProps['color']>;
}
