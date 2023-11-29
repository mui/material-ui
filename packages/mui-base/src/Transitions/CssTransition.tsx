'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useTransitionStateManager, TransitionContext } from '../useTransition';

export interface CssTransitionProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * The name of the CSS class applied to the component when the transition
   * is requested to enter.
   */
  enterClassName?: string;
  /**
   * The name of the CSS class applied to the component when the transition
   * is requested to exit.
   */
  exitClassName?: string;
  /**
   * The name of the CSS property that is transitioned the longest (has the largest `transition-duration`) on enter.
   * This is used to determine when the transition has ended.
   * If not specified, the transition will be considered finished end when the first property is transitioned.
   * If all properties have the same `transition-duration` (or there is just one transitioned property), this can be omitted.
   */
  lastTransitionedPropertyOnEnter?: string;
  /**
   * The name of the CSS property that is transitioned the longest (has the largest `transition-duration`) on exit.
   * This is used to determine when the transition has ended.
   * If not specified, the transition will be considered finished end when the first property is transitioned.
   * If all properties have the same `transition-duration` (or there is just one transitioned property), this can be omitted.
   */
  lastTransitionedPropertyOnExit?: string;
}

/**
 * A utility component that hooks up to the Base UI transitions API and
 * applies a CSS transition to its children when necessary.
 */
export function CssTransition(props: CssTransitionProps) {
  const {
    children,
    className,
    lastTransitionedPropertyOnEnter,
    lastTransitionedPropertyOnExit,
    enterClassName,
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

  const handleTransitionEnd = React.useCallback(
    (event: React.TransitionEvent) => {
      if (requestedEnter) {
        if (
          lastTransitionedPropertyOnEnter == null ||
          event.propertyName === lastTransitionedPropertyOnEnter
        ) {
          onEntered();
        }
      } else if (
        lastTransitionedPropertyOnExit == null ||
        event.propertyName === lastTransitionedPropertyOnExit
      ) {
        onExited();
      }
    },
    [
      onExited,
      onEntered,
      requestedEnter,
      lastTransitionedPropertyOnEnter,
      lastTransitionedPropertyOnExit,
    ],
  );

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(className, requestedEnter ? enterClassName : exitClassName)}
    >
      {children}
    </div>
  );
}
