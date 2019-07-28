import * as React from 'react';
import { OverridableComponent, SimplifiedPropsOf } from '@material-ui/core/OverridableComponent';

declare const Skeleton: OverridableComponent<{
  props: {
    disableAnimate?: boolean;
    height?: any;
    variant?: 'text' | 'rect' | 'circle';
    width?: any;
  };
  defaultComponent: 'div';
  classKey: SkeletonClassKey;
}>;

export type SkeletonClassKey = 'root' | 'text' | 'rect' | 'circle' | 'animate';

export type SkeletonProps = SimplifiedPropsOf<typeof Skeleton>;

export default Skeleton;
