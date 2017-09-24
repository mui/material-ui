import * as React from 'react';
import { StyledComponent } from '..';

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'accent';
  max?: number;
  min?: number;
  mode?: 'determinate' | 'indeterminate';
  size?: number;
  value?: number;
}

declare const CircularProgress: StyledComponent<CircularProgressProps>;

export default CircularProgress
