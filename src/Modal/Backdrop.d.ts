import * as React from 'react';
import { StandardProps } from '..';
import { TransitionDuration } from '../internal/transition';

export interface BackdropProps extends StandardProps<{}, BackdropClassKey> {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  open: boolean;
  transitionDuration?: TransitionDuration;
}

export type BackdropClassKey = 'root' | 'invisible';

declare const Backdrop: React.ComponentType<BackdropProps>;

export default Backdrop;
