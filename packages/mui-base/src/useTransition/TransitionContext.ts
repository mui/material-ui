import * as React from 'react';

export type TransitionContextValue = {
  requestEnter: boolean;
  onExiting: () => void;
  onExited: () => void;
  onEntering: () => void;
  onEntered: () => void;
  registerTransition: () => () => void;
  hasExited: boolean;
};

export const TransitionContext = React.createContext<TransitionContextValue | null>(null);
