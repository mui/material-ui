import * as React from 'react';
import { OverridableComponent, OverridableTypeMap, OverrideProps } from '../OverridableComponent';

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeUnstyledTypeMap<P = {}, D extends React.ElementType = 'div'> {
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
     * The components used for each slot inside the Badge.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
      Root?: React.ElementType;
      Badge?: React.ElementType;
    };
    /**
     * The props used for each slot inside the Badge.
     * @default {}
     */
    componentsProps?: {
      root?: {
        as: React.ElementType;
        styleProps?: Omit<BadgeUnstyledTypeMap<P, D>['props'], 'components' | 'componentsProps'>;
      };
      badge?: {
        as?: React.ElementType;
        styleProps?: Omit<BadgeUnstyledTypeMap<P, D>['props'], 'components' | 'componentsProps'>;
      };
    };
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
      /** Class name applied to the root element. */
      root?: string;
      /** Class name applied to the badge `span` element. */
      badge?: string;
      /** Class name applied to the badge `span` element if `variant="dot"`. */
      dot?: string;
      /** Class name applied to the badge `span` element if `variant="standard"`. */
      standard?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
      anchorOriginTopRightRectangular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
      anchorOriginBottomRightRectangular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
      anchorOriginTopLeftRectangular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
      anchorOriginBottomLeftRectangular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
      anchorOriginTopRightCircular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
      anchorOriginBottomRightCircular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
      anchorOriginTopLeftCircular?: string;
      /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
      anchorOriginBottomLeftCircular?: string;
      /** Pseudo-class applied to the badge `span` element if `invisible={true}`. */
      invisible?: string;
    };
    /**
     * If `true`, the badge is invisible.
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
    variant?: string;
  };
  defaultComponent: D;
}

/**
 * Utility to create component types that inherit props from BadgeUnstyled.
 */
export interface ExtendBadgeUnstyledTypeMap<M extends OverridableTypeMap> {
  props: M['props'] & BadgeUnstyledTypeMap['props'];
  defaultComponent: M['defaultComponent'];
}

export type ExtendBadgeUnstyled<M extends OverridableTypeMap> = OverridableComponent<
  ExtendBadgeUnstyledTypeMap<M>
>;

export type BadgeUnstyledClassKey = keyof NonNullable<BadgeUnstyledTypeMap['props']['classes']>;

/**
 *
 * Demos:
 *
 * - [Avatars](https://material-ui.com/components/avatars/)
 * - [Badges](https://material-ui.com/components/badges/)
 *
 * API:
 *
 * - [BadgeUnstyled API](https://material-ui.com/api/badge-unstyled/)
 */
declare const BadgeUnstyled: OverridableComponent<BadgeUnstyledTypeMap>;

export type BadgeUnstyledProps<
  D extends React.ElementType = BadgeUnstyledTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BadgeUnstyledTypeMap<P, D>, D>;

export default BadgeUnstyled;
