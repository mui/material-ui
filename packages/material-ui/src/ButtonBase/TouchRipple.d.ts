import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';
import { TouchRippleClasses } from './touchRippleClasses';

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TouchRippleClasses>;
};

declare const TouchRipple: React.JSXElementConstructor<TouchRippleProps>;

export default TouchRipple;
