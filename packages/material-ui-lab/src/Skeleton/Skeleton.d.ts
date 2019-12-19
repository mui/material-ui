import * as React from 'react';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface SkeletonTypeMap<P = {}, D extends React.ElementType = 'hr'> {
  props: P & {
    disableAnimate?: boolean;
    height?: number | string;
    variant?: 'text' | 'rect' | 'circle';
    width?: number | string;
  };
  defaultComponent: 'div';
  classKey: SkeletonClassKey;
}

declare const Skeleton: OverridableComponent<SkeletonTypeMap>;

export type SkeletonClassKey = 'root' | 'text' | 'rect' | 'circle' | 'animate';

export type SkeletonProps<
  D extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SkeletonTypeMap<P, D>, D>;

export default Skeleton;
