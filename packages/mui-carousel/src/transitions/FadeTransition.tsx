'use client';
import * as React from 'react';
import { Transition } from 'react-transition-group';
import { getEffectiveDuration } from './transitionUtils';

interface FadeTransitionProps {
  in: boolean;
  timeout: number;
  children: React.ReactElement;
  onEnter?: () => void;
  onExited?: () => void;
}

/**
 * FadeTransition component for crossfade effect
 * Uses React Transition Group to manage opacity transitions
 */
const FadeTransition = React.forwardRef<HTMLElement, FadeTransitionProps>(
  function FadeTransition(props, ref) {
    const { in: inProp, timeout, children, onEnter, onExited } = props;
    const nodeRef = React.useRef<HTMLElement>(null);
    const effectiveDuration = getEffectiveDuration(timeout);

    // Merge refs
    React.useImperativeHandle(ref, () => nodeRef.current as HTMLElement);

    const defaultStyle: React.CSSProperties = {
      transition: `opacity ${effectiveDuration}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles: Record<string, React.CSSProperties> = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    };

    return (
      <Transition
        in={inProp}
        timeout={effectiveDuration}
        nodeRef={nodeRef}
        onEnter={onEnter}
        onExited={onExited}
        appear
      >
        {(state) =>
          React.cloneElement(children, {
            ref: nodeRef,
            style: {
              ...defaultStyle,
              ...transitionStyles[state],
              ...children.props.style,
            },
          })
        }
      </Transition>
    );
  },
);

export default FadeTransition;
