'use client';
import * as React from 'react';
import { TransitionContextValue } from './TransitionContext';

/**
 * Allows child elements to be transitioned in and out.
 *
 * Demos:
 *
 * - [Transitions](https://next.mui.com/base-ui/react-transitions/#hooks)
 *
 * API:
 *
 * - [useTransitionTrigger API](https://next.mui.com/base-ui/react-transitions/hooks-api/#use-transition-trigger)
 */
export function useTransitionTrigger(requestEnter: boolean): UseTransitionTriggerReturnValue {
  const [exitTransitionFinished, setExitTransitionFinished] = React.useState(true);
  const hasPendingExitTransition = React.useRef(false);

  const registeredTransitions = React.useRef(0);
  const [hasTransition, setHasTransition] = React.useState(false);

  const previousRequestEnter = React.useRef(requestEnter);

  React.useEffect(() => {
    if (
      !requestEnter &&
      // checking registeredTransitions.current instead of hasTransition to avoid this effect re-firing whenever hasTransition changes
      registeredTransitions.current > 0 &&
      // prevents waiting for a pending transition right after mounting
      previousRequestEnter.current !== requestEnter
    ) {
      hasPendingExitTransition.current = true;
      setExitTransitionFinished(false);
    }

    previousRequestEnter.current = requestEnter;
  }, [requestEnter]);

  const handleExited = React.useCallback(() => {
    hasPendingExitTransition.current = false;
    setExitTransitionFinished(true);
  }, []);

  const registerTransition = React.useCallback(() => {
    registeredTransitions.current += 1;
    setHasTransition(true);
    return () => {
      registeredTransitions.current -= 1;
      if (registeredTransitions.current === 0) {
        setHasTransition(false);
      }
    };
  }, []);

  let hasExited: boolean;
  if (!hasTransition) {
    // If there are no transitions registered, the `exited` state is opposite of `requestEnter` immediately.
    hasExited = !requestEnter;
  } else if (requestEnter) {
    hasExited = false;
  } else {
    hasExited = !hasPendingExitTransition.current && exitTransitionFinished;
  }

  const contextValue: TransitionContextValue = React.useMemo(
    () => ({
      requestedEnter: requestEnter,
      onExited: handleExited,
      registerTransition,
      hasExited,
    }),
    [handleExited, requestEnter, registerTransition, hasExited],
  );

  return {
    contextValue,
    hasExited,
  };
}

export type UseTransitionTriggerReturnValue = {
  /**
   * The value of a `TransitionContext` to be placed around children that will be transitioned.
   */
  contextValue: TransitionContextValue;
  /**
   * `true`, if the transitioned element has exited completely (or not entered yet).
   */
  hasExited: boolean;
};
