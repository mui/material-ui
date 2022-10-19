import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { BadgeUnstyledTypeMap, ExtendBadgeUnstyledTypeMap } from '@mui/base/BadgeUnstyled';
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
    classes?: Partial<BadgeClasses>;
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
     * The props used for each slot inside the Badge.
     * @default {}
     */
    componentsProps?: BadgeUnstyledTypeMap['props']['slotProps'];
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

type BadgeRootProps = NonNullable<BadgeTypeMap['props']['slotProps']>['root'];
type BadgeBadgeProps = NonNullable<BadgeTypeMap['props']['slotProps']>['badge'];

export declare const BadgeRoot: React.FC<BadgeRootProps>;
export declare const BadgeMark: React.FC<BadgeBadgeProps>;

/**
 *
 * Demos:
 *
 * - [Avatar](https://mui.com/material-ui/react-avatar/)
 * - [Badge](https://mui.com/material-ui/react-badge/)
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
