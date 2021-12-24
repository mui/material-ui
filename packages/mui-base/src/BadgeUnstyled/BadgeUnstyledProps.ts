import * as React from 'react';
import { OverrideProps, OverridableTypeMap } from '@mui/types';
import { BadgeUnstyledClasses } from './badgeUnstyledClasses';

export interface BadgeOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
}

export interface BadgeUnstyledComponentsPropsOverrides {}

export interface BadgeUnstyledTypeMap<P = {}, D extends React.ElementType = 'span'> {
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
      root?: React.HTMLAttributes<HTMLSpanElement> & BadgeUnstyledComponentsPropsOverrides;
      badge?: React.HTMLAttributes<HTMLSpanElement> & BadgeUnstyledComponentsPropsOverrides;
    };
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
    classes?: Partial<BadgeUnstyledClasses>;
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

type BadgeUnstyledProps<
  D extends React.ElementType = BadgeUnstyledTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BadgeUnstyledTypeMap<P, D>, D>;

export default BadgeUnstyledProps;
