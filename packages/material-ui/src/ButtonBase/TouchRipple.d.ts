import * as React from 'react';
import { StandardProps } from '..';

export type TouchRippleProps = StandardProps<
  React.HTMLAttributes<HTMLElement>,
  TouchRippleClassKey
> & {
  center?: boolean;
};

export type TouchRippleClassKey =
  | 'root'
  | 'ripple'
  | 'rippleVisible'
  | 'ripplePulsate'
  | 'child'
  | 'childLeaving'
  | 'childPulsate';

declare const TouchRipple: React.ComponentType<TouchRippleProps>;

export default TouchRipple;
