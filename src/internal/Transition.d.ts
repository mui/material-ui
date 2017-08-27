import * as React from 'react';

export type TransitionCallback = (element: HTMLElement) => void;
export type TransitionRequestTimeout = (element: HTMLElement) => number;

export type TransitionHandlers = {
  onEnter: TransitionCallback;
  onEntering: TransitionCallback;
  onEntered: TransitionCallback;
  onExit: TransitionCallback;
  onExiting: TransitionCallback;
  onExited: TransitionCallback;
};

export interface TransitionProps extends Partial<TransitionHandlers> {
  children?: React.ReactElement<any>;
  className?: string;
  enteredClassName?: string;
  enteringClassName?: string;
  exitedClassName?: string;
  exitingClassName?: string;
  in?: boolean;
  onRequestTimeout?: TransitionRequestTimeout;
  timeout?: number;
  transitionAppear?: boolean;
  unmountOnExit?: boolean;
}

export default class Transition extends React.Component<TransitionProps> {}
