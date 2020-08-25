import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the internal `Ripple` components `ripple` class. */
    ripple?: string;
    /** Styles applied to the internal `Ripple` components `rippleVisible` class. */
    rippleVisible?: string;
    /** Styles applied to the internal `Ripple` components `ripplePulsate` class. */
    ripplePulsate?: string;
    /** Styles applied to the internal `Ripple` components `child` class. */
    child?: string;
    /** Styles applied to the internal `Ripple` components `childLeaving` class. */
    childLeaving?: string;
    /** Styles applied to the internal `Ripple` components `childPulsate` class. */
    childPulsate?: string;
  };
};

export type TouchRippleClassKey = keyof NonNullable<TouchRippleProps['classes']>;

declare const TouchRipple: React.ComponentType<TouchRippleProps>;

export default TouchRipple;
