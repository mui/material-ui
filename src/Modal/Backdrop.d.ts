import * as React from 'react';
import { StandardProps } from '..';
import { FadeProps } from '../transitions/Fade';
import { TransitionTimeout } from '../transitions/transition';

export interface BackdropProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<FadeProps>,
      BackdropClassKey
    > {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  open: boolean;
  transitionDuration?: TransitionTimeout;
}

export type BackdropClassKey = 'root' | 'invisible';

declare const Backdrop: React.ComponentType<BackdropProps>;

export default Backdrop;
