<<<<<<< 9a9324231acb7cc37086519d614b4c15c413b11c
import * as React from 'react';

export type TransitionDuration = number | { enter: number; exit: number };
export type TransitionCallback = (element: HTMLElement) => void;

export interface TransitionHandlers {
  onEnter: TransitionCallback;
  onEntering: TransitionCallback;
  onEntered: TransitionCallback;
  onExit: TransitionCallback;
  onExiting: TransitionCallback;
  onExited: TransitionCallback;
}

export interface TransitionProps extends Partial<TransitionHandlers> {
  children: React.ReactElement<any>;
  style?: React.CSSProperties;
  className?: string;
  in: boolean;
  appear?: boolean;
  unmountOnExit?: boolean;
=======
import { EnterHandler, ExitHandler, TransitionProps } from 'react-transition-group/Transition';

export type TransitionDuration = TransitionProps['timeout'];

export interface TransitionHandlers {
  onEnter: EnterHandler;
  onEntering: EnterHandler;
  onEntered: EnterHandler;
  onExit: ExitHandler;
  onExiting: ExitHandler;
  onExited: ExitHandler;
>>>>>>> reestablish some types in transition.d.ts that are reused
}
