'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTransitionStateManager } from '../useTransition';

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
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssTransition API](https://mui.com/base-ui/react-transitions/components-api/#css-transition)
 */
function CssTransition(props: CssTransitionProps) {
  const {
    children,
    className,
    lastTransitionedPropertyOnEnter,
    lastTransitionedPropertyOnExit,
    enterClassName,
    exitClassName,
    ...other
  } = props;

  const { requestedEnter, onEntering, onEntered, onExiting, onExited } =
    useTransitionStateManager();

  const hasExited = React.useRef(true);

  React.useEffect(() => {
    if (requestedEnter && hasExited.current) {
      onEntering();
      hasExited.current = false;
    } else if (!requestedEnter && !hasExited.current) {
      onExiting();
    }
  }, [onEntering, onExiting, requestedEnter]);

  const handleTransitionEnd = React.useCallback(
    (event: React.TransitionEvent) => {
      if (requestedEnter) {
        if (
          lastTransitionedPropertyOnEnter == null ||
          event.propertyName === lastTransitionedPropertyOnEnter
        ) {
          onEntered();
          hasExited.current = false;
        }
      } else if (
        lastTransitionedPropertyOnExit == null ||
        event.propertyName === lastTransitionedPropertyOnExit
      ) {
        onExited();
        hasExited.current = true;
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
      {...other}
    >
      {children}
    </div>
  );
}

CssTransition.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enterClassName: PropTypes.string,
  exitClassName: PropTypes.string,
  lastTransitionedPropertyOnEnter: PropTypes.string,
  lastTransitionedPropertyOnExit: PropTypes.string,
} as any;

export { CssTransition };
