'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useTransitionStateManager, TransitionContext } from '../useTransition';

export interface CssAnimationProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * The name of the CSS animation (the `animation-name` CSS property) applied to the component when
   * the transition is requested to enter.
   */
  enterAnimationName?: string;
  /**
   * The name of the CSS class applied to the component when the transition
   * is requested to enter.
   */
  enterClassName?: string;
  /**
   * The name of the CSS animation (the `animation-name` CSS property) applied to the component when
   * the transition is requested to exit.
   */
  exitAnimationName?: string;
  /**
   * The name of the CSS class applied to the component when the transition
   * is requested to exit.
   */
  exitClassName?: string;
}

export function CssAnimation(props: CssAnimationProps) {
  const {
    children,
    className,
    enterAnimationName,
    enterClassName,
    exitAnimationName,
    exitClassName,
  } = props;

  const transitionContext = React.useContext(TransitionContext);
  if (!transitionContext) {
    throw new Error('Missing transition context');
  }

  const { requestedEnter, onEntering, onEntered, onExiting, onExited, hasExited } =
    useTransitionStateManager();

  React.useEffect(() => {
    if (requestedEnter && !hasExited) {
      onEntering();
    } else if (!requestedEnter && hasExited) {
      onExiting();
    }
  }, [onEntering, onExiting, requestedEnter, hasExited]);

  const handleAnimationEnd = React.useCallback(
    (event: React.AnimationEvent) => {
      if (event.animationName === exitAnimationName) {
        onExited();
      } else if (event.animationName === enterAnimationName) {
        onEntered();
      }
    },
    [onExited, onEntered, exitAnimationName, enterAnimationName],
  );

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={clsx(className, requestedEnter ? enterClassName : exitClassName)}
    >
      {children}
    </div>
  );
}
