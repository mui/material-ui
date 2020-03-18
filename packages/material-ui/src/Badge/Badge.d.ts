import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The anchor of the badge.
     */
    anchorOrigin?: BadgeOrigin;
    /**
     * Wrapped shape the badge should overlap.
     */
    overlap?: 'rectangle' | 'circle';
    /**
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactNode;
    /**
     * The badge will be added relative to this node.
     */
    children: React.ReactNode;
    /**
     * The color of the component.
     * It supports those theme colors that make sense for this component.
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
    variant?: 'standard' | 'dot';
  };
  defaultComponent: D;
  classKey: BadgeClassKey;
}

export type BadgeClassKey =
  | 'root'
  | 'badge'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'colorError'
  | 'dot'
  | 'anchorOriginTopRightRectangle'
  | 'anchorOriginBottomRightRectangle'
  | 'anchorOriginTopLeftRectangle'
  | 'anchorOriginBottomLeftRectangle'
  | 'anchorOriginTopRightCircle'
  | 'anchorOriginBottomRightCircle'
  | 'anchorOriginTopLeftCircle'
  | 'invisible';

declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<BadgeTypeMap<P, D>, D>;

export default Badge;
