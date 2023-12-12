import * as React from 'react';

export type TransitionContextValue = {
  requestedEnter: boolean;
  onExiting: () => void;
  onExited: () => void;
  onEntering: () => void;
  onEntered: () => void;
  registerTransition: () => () => void;
};

export const TransitionContext = React.createContext<TransitionContextValue | null>(null);
