import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { SkeletonClasses } from './skeletonClasses';

export interface SkeletonPropsVariantOverrides {}

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    /**
     * The animation.
     * If `false` the animation effect is disabled.
     * @default 'pulse'
     */
    animation?: 'pulse' | 'wave' | false;
    /**
     * Optional children to infer width and height from.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<SkeletonClasses>;
    /**
     * Height of the skeleton.
     * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: number | string;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The type of content that will be rendered.
     * @default 'text'
     */
    variant?: OverridableStringUnion<
      'text' | 'rectangular' | 'circular',
      SkeletonPropsVariantOverrides
    >;
    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
  };
  defaultComponent: D;
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

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export default Skeleton;
