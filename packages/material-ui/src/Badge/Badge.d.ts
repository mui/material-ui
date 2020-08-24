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
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * Wrapped shape the badge should overlap.
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
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the badge `span` element. */
      badge?: string;
      /** Styles applied to the root element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the root element if `color="secondary"`. */
      colorSecondary?: string;
      /** Styles applied to the root element if `color="error"`. */
      colorError?: string;
      /** Styles applied to the root element if `variant="dot"`. */
      dot?: string;
      /** Styles applied to the root element if `variant="standard"`. */
      standard?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
      anchorOriginTopRightRectangular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
      anchorOriginBottomRightRectangular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
      anchorOriginTopLeftRectangular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
      anchorOriginBottomLeftRectangular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
      anchorOriginTopRightCircular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
      anchorOriginBottomRightCircular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
      anchorOriginTopLeftCircular?: string;
      /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
      anchorOriginBottomLeftCircular?: string;
      /** Pseudo-class to the badge `span` element if `invisible={true}`. */
      invisible?: string;
    };
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     */
    color?: 'primary' | 'secondary' | 'default' | 'error';
    /**
     * If `true`, the badge will be invisible.
     */
    invisible?: boolean;
    /**
     * Max count to show.
     */
    max?: number;
    /**
     * Controls whether the badge is hidden when `badgeContent` is zero.
     */
    showZero?: boolean;
    /**
     * The variant to use.
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
