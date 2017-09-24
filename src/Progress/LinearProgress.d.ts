import * as React from 'react';
import { StyledComponent } from '..';

export interface LinearProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'primary' | 'accent';
  mode?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value?: number;
  valueBuffer?: number;
}

declare const LinearProgress: StyledComponent<LinearProgressProps>;

export default LinearProgress;
