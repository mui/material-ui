import * as React from 'react';
import { InternalStandardProps as StandardProps } from '..';

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes?: {};
};

export type TouchRippleClassKey = keyof NonNullable<TouchRippleProps['classes']>;

declare const TouchRipple: React.ComponentType<TouchRippleProps>;

export default TouchRipple;
