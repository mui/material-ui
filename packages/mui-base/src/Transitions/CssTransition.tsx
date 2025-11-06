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
const CssTransition = React.forwardRef(function CssTransition(
  props: CssTransitionProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    className,
    lastTransitionedPropertyOnExit,
    enterClassName,
    exitClassName,
    ...other
  } = props;

  const { requestedEnter, onExited } = useTransitionStateManager();

  const [isEntering, setIsEntering] = React.useState(false);

  // The `isEntering` state (which is used to determine the right CSS class to apply)
  // is updated slightly (one animation frame) after the `requestedEnter` state is updated.
  // Thanks to this, elements that are mounted will have their enter transition applied
  // (if the `enterClassName` was applied when the element was mounted, the transition would not be fired).
  React.useEffect(() => {
    if (requestedEnter) {
      requestAnimationFrame(() => {
        setIsEntering(true);
      });
    } else {
      setIsEntering(false);
    }
  }, [requestedEnter]);

  const handleTransitionEnd = React.useCallback(
    (event: React.TransitionEvent) => {
      if (
        !requestedEnter &&
        (lastTransitionedPropertyOnExit == null ||
          event.propertyName === lastTransitionedPropertyOnExit)
      ) {
        onExited();
      }
    },
    [onExited, requestedEnter, lastTransitionedPropertyOnExit],
  );

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={clsx(className, isEntering ? enterClassName : exitClassName)}
      {...other}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
});

CssTransition.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  enterClassName: PropTypes.string,
  exitClassName: PropTypes.string,
  lastTransitionedPropertyOnEnter: PropTypes.string,
  lastTransitionedPropertyOnExit: PropTypes.string,
} as any;

export { CssTransition };
