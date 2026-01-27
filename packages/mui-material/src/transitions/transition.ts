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
  | TransitionHandlerKeys;
export interface TransitionProps
  extends
    Omit<TransitionActions, 'addEndListener'>,
    Partial<Pick<_TransitionProps & EasingProps, TransitionKeys>>,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener?: (node: HTMLElement, done: () => void) => void;
}
