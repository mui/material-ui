import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TouchRippleClasses, TouchRippleClassKey } from './touchRippleClasses';

export { TouchRippleClassKey };

export interface StartActionOptions {
  pulsate?: boolean;
  center?: boolean;
}

export interface TouchRippleActions {
  start: (
    event?: React.SyntheticEvent,
    options?: StartActionOptions,
    callback?: () => void,
  ) => void;
  pulsate: (event?: React.SyntheticEvent) => void;
  stop: (event?: React.SyntheticEvent, callback?: () => void) => void;
}

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TouchRippleClasses>;
};

declare const TouchRipple: React.ForwardRefRenderFunction<TouchRippleActions, TouchRippleProps>;

export default TouchRipple;
