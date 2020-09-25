import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface SkeletonPropsVariantOverrides {}
export type SkeletonVariantDefaults = Record<'text' | 'rectangular' | 'circular', true>;

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
    classes?: {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `variant="text"`. */
      text?: string;
      /** Styles applied to the root element if `variant="rectangular"`. */
      rectangular?: string;
      /** Styles applied to the root element if `variant="circular"`. */
      circular?: string;
      /** Styles applied to the root element if `animation="pulse"`. */
      pulse?: string;
      /** Styles applied to the root element if `animation="wave"`. */
      wave?: string;
      /** Styles applied when the component is passed children. */
      withChildren?: string;
      /** Styles applied when the component is passed children and no width. */
      fitContent?: string;
      /** Styles applied when the component is passed children and no height. */
      heightAuto?: string;
    };
    /**
     * Height of the skeleton.
     * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
     */
    height?: number | string;
    /**
     * The type of content that will be rendered.
     * @default 'text'
     */
    variant?: OverridableStringUnion<SkeletonVariantDefaults, SkeletonPropsVariantOverrides>;
    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
  };
  defaultComponent: 'div';
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

export type SkeletonClassKey = keyof NonNullable<SkeletonTypeMap['props']['classes']>;

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export default Skeleton;
