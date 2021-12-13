import {
  TransitionProps as _TransitionProps,
  TransitionActions,
} from 'react-transition-group/Transition';
import * as React from 'react';

export type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';
export type TransitionHandlerProps = Pick<_TransitionProps, TransitionHandlerKeys>;

export interface EasingProps {
  easing: string | { enter?: string; exit?: string };
}

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'easing'
  | 'addEndListener'
  | TransitionHandlerKeys;
export interface TransitionProps
  extends TransitionActions,
    Partial<Pick<_TransitionProps & EasingProps, TransitionKeys>>,
    React.HTMLAttributes<HTMLElement> {}
