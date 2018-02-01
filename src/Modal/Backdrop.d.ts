import * as React from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { StandardProps } from '..';
import { FadeProps } from '../transitions/Fade';

export interface BackdropProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<FadeProps>,
      BackdropClassKey
    > {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  open: boolean;
  transitionDuration?: TransitionProps['timeout'];
}

export type BackdropClassKey = 'root' | 'invisible';

declare const Backdrop: React.ComponentType<BackdropProps>;

export default Backdrop;
