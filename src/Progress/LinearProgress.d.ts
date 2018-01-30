import * as React from 'react';
import { StandardProps } from '..';

export interface LinearProgressProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, LinearProgressClassKey> {
  color?: 'primary' | 'secondary';
  value?: number;
  valueBuffer?: number;
  variant?: 'determinate' | 'indeterminate' | 'buffer' | 'query';
}

export type LinearProgressClassKey =
  | 'root'
  | 'primaryColor'
  | 'primaryColorBar'
  | 'primaryDashed'
  | 'secondaryColor'
  | 'secondaryColorBar'
  | 'secondaryDashed'
  | 'bar'
  | 'dashed'
  | 'bufferBar2'
  | 'rootBuffer'
  | 'rootQuery'
  | 'indeterminateBar1'
  | 'indeterminateBar2'
  | 'determinateBar1'
  | 'bufferBar1';

declare const LinearProgress: React.ComponentType<LinearProgressProps>;

export default LinearProgress;
