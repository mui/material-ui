'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useTransitionStateManager } from '../useTransition';

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

/**
 *
 * Demos:
 *
 * - [Popup](https://mui.com/base-ui/react-popup/)
 *
 * API:
 *
 * - [CssAnimation API](https://mui.com/base-ui/react-popup/components-api/#css-animation)
 */
function CssAnimation(props: CssAnimationProps) {
  const {
    children,
    className,
    enterAnimationName,
    enterClassName,
    exitAnimationName,
    exitClassName,
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

  const handleAnimationEnd = React.useCallback(
    (event: React.AnimationEvent) => {
      if (event.animationName === exitAnimationName) {
        onExited();
        hasExited.current = true;
      } else if (event.animationName === enterAnimationName) {
        onEntered();
        hasExited.current = false;
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

CssAnimation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enterAnimationName: PropTypes.string,
  enterClassName: PropTypes.string,
  exitAnimationName: PropTypes.string,
  exitClassName: PropTypes.string,
};

export { CssAnimation };
