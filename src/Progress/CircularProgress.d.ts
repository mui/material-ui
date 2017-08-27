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

export default class CircularProgress extends StyledComponent<
  CircularProgressProps
> {}
