import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {};
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
