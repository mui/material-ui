import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { SkeletonClasses } from './skeletonClasses';

export interface SkeletonPropsVariantOverrides {}

export interface SkeletonPropsSizeOverrides {}

export interface SkeletonPropsShapeOverrides {}

export interface SkeletonTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & {
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
     * The shape of the skeleton.
     */
    shape?: OverridableStringUnion<
      'rectangular' | 'rounded' | 'circular',
      SkeletonPropsShapeOverrides
    >;
    /**
     * Determines the scaling behavior of the skeleton, whether to adapt to the size of the text or
     * the size of the containing element.
     */
    size?: OverridableStringUnion<'text' | 'box', SkeletonPropsSizeOverrides>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The type of content that will be rendered.
     * @default 'text'
     * @deprecated Use `shape` prop to set the shape of the skeleton and `size` prop to set the scale adaptation.
     */
    variant?: OverridableStringUnion<
      'text' | 'rectangular' | 'rounded' | 'circular',
      SkeletonPropsVariantOverrides
    >;
    /**
     * Width of the skeleton.
     * Useful when the skeleton is inside an inline element with no width of its own.
     */
    width?: number | string;
  };
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Skeleton](https://mui.com/material-ui/react-skeleton/)
 *
 * API:
 *
 * - [Skeleton API](https://mui.com/material-ui/api/skeleton/)
 */
declare const Skeleton: OverridableComponent<SkeletonTypeMap>;

export type SkeletonProps<
  RootComponent extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SkeletonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Skeleton;
