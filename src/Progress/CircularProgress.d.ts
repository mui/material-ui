import * as React from 'react';
import { StandardProps } from '..';

export interface CircularProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, CircularProgressClassKey> {
  color?: 'primary' | 'secondary' | 'inherit';
  max?: number;
  min?: number;
  mode?: 'determinate' | 'indeterminate';
  size?: number | string;
  thickness?: number;
  value?: number;
}

export type CircularProgressClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'svg'
  | 'indeterminateSvg'
  | 'circle'
  | 'indeterminateCircle'
  | 'determinateCircle';

declare const CircularProgress: React.ComponentType<CircularProgressProps>;

export default CircularProgress;
