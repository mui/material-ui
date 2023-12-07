import * as React from 'react';
// eslint-disable-next-line no-restricted-imports
import { InternalStandardProps as StandardProps } from '@mui/material';
import { TouchRippleClasses } from './touchRippleClasses';

export type { TouchRippleClassKey } from './touchRippleClasses';

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
  stop: (event?: React.SyntheticEvent, callback?: () => void) => void;
}

export type TouchRippleProps = StandardProps<React.HTMLAttributes<HTMLElement>> & {
  center?: boolean;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TouchRippleClasses>;
};
