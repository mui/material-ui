import * as React from 'react';

export type TransitionContextValue = {
  /**
   * `true`, if the current element was requested to appear.
   */
  requestedEnter: boolean;
  /**
   * Callback to be called when the element has completely exited.
   */
  onExited: () => void;
  /**
   * Registers a child transition.
   * This is used to notify the parent `useTransitionTrigger` hook that a child transition exists
   * and state changes must be triggered by the context's callbck functions.
   *
   * Returns a function to unregister the child transition.
   */
  registerTransition: () => () => void;
};

export const TransitionContext = React.createContext<TransitionContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  TransitionContext.displayName = 'TransitionContext';
}
