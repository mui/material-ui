import * as React from 'react';
import { TransitionContext, TransitionContextValue } from './TransitionContext';
/**
 *
 * API:
 *
 * - [useTransition API](https://mui.com/base-ui/api/use-transition/)
 */
export function useTransition() {
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

export function useTransitionableElement(requestEnter: boolean) {
  const [hasExited, setHasExited] = React.useState(true);
  const [inTransition, setInTransition] = React.useState(false);
  const hasTransition = React.useRef(false);

  const handleEntering = React.useCallback(() => {
    setHasExited(false);
    setInTransition(true);
  }, []);

  const handleEntered = React.useCallback(() => {
    setHasExited(false);
    setInTransition(false);
  }, []);

  const handleExiting = React.useCallback(() => {
    setHasExited(false);
    setInTransition(true);
  }, []);

  const handleExited = React.useCallback(() => {
    setHasExited(true);
    setInTransition(true);
  }, []);

  React.useEffect(() => {
    if (!hasTransition.current) {
      setHasExited(!requestEnter);
      setInTransition(false);
    }
  }, [requestEnter]);

  const registerTransition = React.useCallback(() => {
    hasTransition.current = true;
    return () => {
      hasTransition.current = false;
    };
  }, []);

  const contextValue: TransitionContextValue = React.useMemo(
    () => ({
      requestEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExiting: handleExiting,
      onExited: handleExited,
      registerTransition,
      hasExited,
    }),
    [
      handleEntering,
      handleEntered,
      handleExiting,
      handleExited,
      requestEnter,
      registerTransition,
      hasExited,
    ],
  );

  return {
    contextValue,
    hasExited,
    transitionInProgress: inTransition,
  };
}
