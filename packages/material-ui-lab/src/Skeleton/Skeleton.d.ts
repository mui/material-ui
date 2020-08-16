import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface SkeletonPropsVariantOverrides {}
export type SkeletonVariantDefaults = Record<'text' | 'rectangular' | 'circular', true>;

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The animation.
     * If `false` the animation effect is disabled.
     */
    animation?: 'pulse' | 'wave' | false;
    /**
     * Optional children to infer width and height from.
     */
    children?: React.ReactNode;
    /**
     * Height of the skeleton.
     * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: number | string;
    /**
     * The type of content that will be rendered.
     */
    variant?: OverridableStringUnion<SkeletonVariantDefaults, SkeletonPropsVariantOverrides>;
    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
  };
  defaultComponent: 'div';
  classKey: SkeletonClassKey;
}

/**
 *
 * Demos:
 *
 * - [Skeleton](https://material-ui.com/components/skeleton/)
 *
 * API:
 *
 * - [Skeleton API](https://material-ui.com/api/skeleton/)
 */
declare const Skeleton: OverridableComponent<SkeletonTypeMap>;

export type SkeletonClassKey =
  | 'root'
  | 'text'
  | 'rectangular'
  | 'circular'
  | 'pulse'
  | 'wave'
  | 'withChildren'
  | 'fitContent'
  | 'heightAuto';

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export default Skeleton;
