'use client';
import * as React from 'react';
import { TransitionContext } from './TransitionContext';

/**
 *
 * API:
 *
 * - [useTransitionStateManager API](https://mui.com/base-ui/api/use-transition/)
 */
export function useTransitionStateManager() {
  const transitionContext = React.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }

  const {
    registerTransition,
    requestEnter: requestOpen,
    onEntering,
    onEntered,
    onExiting,
    onExited,
    hasExited,
  } = transitionContext;

  React.useEffect(() => {
    return registerTransition();
  }, [registerTransition]);

  return {
    onEntering,
    onEntered,
    onExiting,
    onExited,
    requestedEnter: requestOpen,
    hasExited,
  };
}
