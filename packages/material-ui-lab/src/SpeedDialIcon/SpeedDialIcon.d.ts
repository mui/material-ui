import * as React from 'react';
import { StandardProps } from '@material-ui/core';

export interface SpeedDialIconProps
  extends StandardProps<
    React.HTMLAttributes<HTMLSpanElement>,
    SpeedDialIconClassKey,
    never,
    false
  > {
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
}

export type SpeedDialIconClassKey =
  | 'root'
  | 'icon'
  | 'iconOpen'
  | 'iconWithOpenIconOpen'
  | 'openIcon'
  | 'openIconOpen';

declare const SpeedDialIcon: React.ComponentType<SpeedDialIconProps>;

export default SpeedDialIcon;
