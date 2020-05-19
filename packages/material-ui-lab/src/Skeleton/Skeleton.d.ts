import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    animation?: 'pulse' | 'wave' | false;
    children?: React.ReactNode;
    height?: number | string;
    variant?: 'text' | 'rect' | 'circle';
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
  | 'rect'
  | 'circle'
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
