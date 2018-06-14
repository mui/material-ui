import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { StandardProps } from '..';

export interface TouchRippleProps
  extends StandardProps<TransitionGroup.TransitionGroupProps, TouchRippleClassKey> {
  center?: boolean;
}

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
