'use client';
import * as React from 'react';
import { TransitionContext } from './TransitionContext';

export type UseTransitionStateManagerReturnValue = {
  /**
   * `true`, if the current element should be visible.
   */
  requestedEnter: boolean;
  /**
   * Callback to be called when the element has completely exited.
   */
  onExited: () => void;
};

/**
 * Allows an element to be transitioned in and out.
 * The transition is triggerred by a `TransitionContext` placed above in the component tree.
 *
 * Demos:
 *
 * - [Transitions](https://next.mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionStateManager API](https://next.mui.com/base-ui/react-transitions/hooks-api/#use-transition-state-manager)
 */
export function useTransitionStateManager(): UseTransitionStateManagerReturnValue {
  const transitionContext = React.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }

  const { registerTransition, requestedEnter, onExited } = transitionContext;

  React.useEffect(() => {
    return registerTransition();
  }, [registerTransition]);

  return {
    onExited,
    requestedEnter,
  };
}
