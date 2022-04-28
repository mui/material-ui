import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { ExtendBadgeUnstyledTypeMap } from '@mui/base/BadgeUnstyled';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BadgeClasses } from './badgeClasses';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

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
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<BadgeClasses> & {
      /** Styles applied to the badge `span` element if `color="primary"`. */
      colorPrimary?: string;
      /** Styles applied to the badge `span` element if `color="secondary"`. */
      colorSecondary?: string;
      /** Styles applied to the badge `span` element if `color="error"`. */
      colorError?: string;
      /** Styles applied to the badge `span` element if `color="info"`. */
      colorInfo?: string;
      /** Styles applied to the badge `span` element if `color="success"`. */
      colorSuccess?: string;
      /** Styles applied to the badge `span` element if `color="warning"`. */
      colorWarning?: string;
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
      /** Class name applied to the badge `span` element if `overlap="rectangular"`. */
      overlapRectangular?: string;
      /** Class name applied to the badge `span` element if `overlap="circular"`. */
      overlapCircular?: string;
    };
    /**
     * @ignore
     */
    className?: string;
    /**
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
     * @default 'default'
     */
    color?: OverridableStringUnion<
      'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
      BadgePropsColorOverrides
    >;
    /**
     * Wrapped shape the badge should overlap.
     * @default 'rectangular'
     */
    overlap?: 'rectangular' | 'circular';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides>;
  };
  defaultComponent: D;
}>;

type BadgeRootProps = NonNullable<BadgeTypeMap['props']['componentsProps']>['root'];
type BadgeBadgeProps = NonNullable<BadgeTypeMap['props']['componentsProps']>['badge'];

export const BadgeRoot: React.FC<BadgeRootProps>;
export const BadgeMark: React.FC<BadgeBadgeProps>;

/**
 *
 * Demos:
 *
 * - [Avatars](https://mui.com/material-ui/react-avatar/)
 * - [Badges](https://mui.com/material-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/material-ui/api/badge/)
 * - inherits [BadgeUnstyled API](https://mui.com/base/api/badge-unstyled/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BadgeTypeMap<D, P>, D>;

export default Badge;
