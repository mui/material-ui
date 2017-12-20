import * as React from 'react';

export type EndHandler = (node: HTMLElement, done: () => void) => void;
export type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
export type ExitHandler = (node: HTMLElement) => void;

// NOTE:
// copied and modified from @types/react-transition-group - they weren't recognized/work for some reason
export interface TransitionHandlers {
  onEnter: EnterHandler;
  onEntering: EnterHandler;
  onEntered: EnterHandler;
  onExit: ExitHandler;
  onExiting: ExitHandler;
  onExited: ExitHandler;
}

export interface TransitionActions {
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
}

export interface TransitionProps extends TransitionActions, Partial<TransitionHandlers> {
  addEndListener?: EndHandler;
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  timeout: number | { enter?: number; exit?: number };
  style?: React.CSSProperties;
}

export type TransitionDuration = TransitionProps['timeout'];

export interface CSSTransitionClassNames {
  appear?: string;
  appearActive?: string;
  enter?: string;
  enterActive?: string;
  exit?: string;
  exitActive?: string;
}

export interface CSSTransitionProps extends TransitionProps {
  classNames: string | CSSTransitionClassNames;
}
