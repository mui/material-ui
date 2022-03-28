import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { ExtendBadgeUnstyledTypeMap, BadgeUnstyledTypeMap } from '@mui/base/BadgeUnstyled';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface BadgePropsVariantOverrides {}

export interface BadgePropsColorOverrides {}

export type BadgeTypeMap<
  D extends React.ElementType = 'span',
  P = {},
> = ExtendBadgeUnstyledTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: BadgeUnstyledTypeMap['props']['classes'] & {
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
     * The color of the component.
     * It supports both default and custom theme colors, which can be added as shown in the
     * [palette customization guide](https://mui.com/customization/palette/#adding-new-colors).
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

export type BadgeClassKey = keyof NonNullable<BadgeTypeMap['props']['classes']>;
/**
 *
 * Demos:
 *
 * - [Avatars](https://mui.com/components/avatars/)
 * - [Badges](https://mui.com/components/badges/)
 *
 * API:
 *
 * - [Badge API](https://mui.com/api/badge/)
 * - inherits [BadgeUnstyled API](https://mui.com/api/badge-unstyled/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeClasses = Record<BadgeClassKey, string>;

export const badgeClasses: BadgeClasses;

export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BadgeTypeMap<D, P>, D>;

export default Badge;
