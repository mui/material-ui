import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgePropsVariantOverrides {}
export type BadgeVariantDefaults = Record<'standard' | 'dot', true>;

export interface BadgeTypeMap<P = {}, D extends React.ElementType = 'div'> {
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
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
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
    classes?: {
      root?: string;
      badge?: string;
      colorPrimary?: string;
      colorSecondary?: string;
      colorError?: string;
      dot?: string;
      standard?: string;
      anchorOriginTopRightRectangular?: string;
      anchorOriginBottomRightRectangular?: string;
      anchorOriginTopLeftRectangular?: string;
      anchorOriginBottomLeftRectangular?: string;
      anchorOriginTopRightCircular?: string;
      anchorOriginBottomRightCircular?: string;
      anchorOriginTopLeftCircular?: string;
      anchorOriginBottomLeftCircular?: string;
      invisible?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'default'
     */
    color?: 'primary' | 'secondary' | 'default' | 'error';
    /**
     * If `true`, the badge will be invisible.
     */
    invisible?: boolean;
    /**
     * Max count to show.
     * @default 99
     */
    max?: number;
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     * @default false
     */
    showZero?: boolean;
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<BadgeVariantDefaults, BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}

export type BadgeClassKey = keyof NonNullable<BadgeTypeMap['props']['classes']>;
/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 * - [Badges](https://material-ui.com/components/badges/)
 *
 * API:
 *
 * - [Badge API](https://material-ui.com/api/badge/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BadgeTypeMap<P, D>, D>;

export default Badge;
