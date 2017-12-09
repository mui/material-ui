import * as React from 'react';
import { StandardProps } from '..';

export interface CircularProgressProps extends StandardProps<
  React.HTMLAttributes<HTMLDivElement>,
  CircularProgressClassKey
> {
  color?: 'primary' | 'accent' | 'inherit';
  max?: number;
  min?: number;
  mode?: 'determinate' | 'indeterminate';
  size?: number;
  thickness?: number;
  value?: number;
}

export type CircularProgressClassKey =
  | 'root'
  | 'primaryColor'
  | 'accentColor'
  | 'svg'
  | 'indeterminateSvg'
  | 'circle'
  | 'indeterminateCircle'
  | 'determinateCircle'
  ;

declare const CircularProgress: React.ComponentType<CircularProgressProps>;

export default CircularProgress
