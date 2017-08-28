import * as React from 'react';
import { StyledComponent } from '..';

export interface LinearProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'accent';
  mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value?: number;
  valueBuffer?: number;
}

export default class LinearProgress extends StyledComponent<
  LinearProgressProps
> {}
