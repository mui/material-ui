'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import getReactElementRef from '@mui/utils/getReactElementRef';
import Transition from '../Transition/Transition';
import { useTheme } from '../zero-styled';
import {
  normalizedTransitionCallback,
  reflow,
  getTransitionProps,
  getTransitionChildStyle,
} from '../transitions/utils';
import useForkRef from '../utils/useForkRef';

const styles = {
  entering: { transform: 'none' },
  entered: { transform: 'none' },
  exiting: { transform: 'scale(0)' },
  exited: { transform: 'scale(0)' },
};

const hiddenStyles = { transform: 'scale(0)', visibility: 'hidden' };

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](/material-ui/react-floating-action-button/#animation) component.
 */
const Zoom = React.forwardRef(function Zoom(props, ref) {
  const theme = useTheme();
  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    addEndListener,
    appear = true,
    children,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    ...other
  } = props;

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(nodeRef, getReactElementRef(children), ref);

  const handleEntering = normalizedTransitionCallback(nodeRef, onEntering);

  const handleEnter = normalizedTransitionCallback(nodeRef, (node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'enter',
      },
    );

    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(nodeRef, onEntered);

  const handleExiting = normalizedTransitionCallback(nodeRef, onExiting);

  const handleExit = normalizedTransitionCallback(nodeRef, (node) => {
    const transitionProps = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'exit',
      },
    );

    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(nodeRef, (node) => {
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };

  return (
    <Transition
      appear={appear}
      in={inProp}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      timeout={timeout}
      {...other}
    >
      {/* Ensure "ownerState" is not forwarded to the child DOM element when a direct HTML element is used. This avoids unexpected behavior since "ownerState" is intended for internal styling, component props and not as a DOM attribute. */}
      {(state, { ownerState, ...restChildProps }) => {
        const childStyle = getTransitionChildStyle(
          state,
          inProp,
          styles,
          hiddenStyles,
          style,
          children.props.style,
        );

        return React.cloneElement(children, {
          style: childStyle,
          ref: handleRef,
          ...restChildProps,
        });
      }}
    </Transition>
  );
});

Zoom.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger.
   * Allows for more fine grained transition end logic.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call to indicate the transition is finished.
   */
  addEndListener: PropTypes.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([
    PropTypes.shape({
      enter: PropTypes.string,
      exit: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Zoom;
