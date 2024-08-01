'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import chainPropTypes from '@mui/utils/chainPropTypes';
import HTMLElementType from '@mui/utils/HTMLElementType';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import getReactNodeRef from '@mui/utils/getReactNodeRef';
import debounce from '../utils/debounce';
import useForkRef from '../utils/useForkRef';
import { useTheme } from '../zero-styled';
import { reflow, getTransitionProps } from '../transitions/utils';
import { ownerWindow } from '../utils';

// Translate the node so it can't be seen on the screen.
// Later, we're going to translate the node back to its original location with `none`.
function getTranslateValue(direction, node, resolvedContainer) {
  const rect = node.getBoundingClientRect();
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = ownerWindow(node);
  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = containerWindow.getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    if (containerRect) {
      return `translateX(${containerRect.right + offsetX - rect.left}px)`;
    }

    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }

  if (direction === 'right') {
    if (containerRect) {
      return `translateX(-${rect.right - containerRect.left - offsetX}px)`;
    }

    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    if (containerRect) {
      return `translateY(${containerRect.bottom + offsetY - rect.top}px)`;
    }
    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  }

  // direction === 'down'
  if (containerRect) {
    return `translateY(-${rect.top - containerRect.top + rect.height - offsetY}px)`;
  }
  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

function resolveContainer(containerPropProp) {
  return typeof containerPropProp === 'function' ? containerPropProp() : containerPropProp;
}

export function setTranslateValue(direction, node, containerProp) {
  const resolvedContainer = resolveContainer(containerProp);
  const transform = getTranslateValue(direction, node, resolvedContainer);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

/**
 * The Slide transition is used by the [Drawer](/material-ui/react-drawer/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Slide = React.forwardRef(function Slide(props, ref) {
  const theme = useTheme();
  const defaultEasing = {
    enter: theme.transitions.easing.easeOut,
    exit: theme.transitions.easing.sharp,
  };

  const defaultTimeout = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const {
    addEndListener,
    appear = true,
    children,
    container: containerProp,
    direction = 'down',
    easing: easingProp = defaultEasing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;

  const childrenRef = React.useRef(null);
  const handleRef = useForkRef(getReactNodeRef(children), childrenRef, ref);

  const normalizedTransitionCallback = (callback) => (isAppearing) => {
    if (callback) {
      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (isAppearing === undefined) {
        callback(childrenRef.current);
      } else {
        callback(childrenRef.current, isAppearing);
      }
    }
  };

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    reflow(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'enter',
      },
    );

    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
    });

    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
    });

    node.style.webkitTransform = 'none';
    node.style.transform = 'none';
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);

  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'exit',
      },
    );

    node.style.webkitTransition = theme.transitions.create('-webkit-transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);

    setTranslateValue(direction, node, containerProp);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback((node) => {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });

  const handleAddEndListener = (next) => {
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(childrenRef.current, next);
    }
  };

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current, containerProp);
    }
  }, [direction, containerProp]);

  React.useEffect(() => {
    // Skip configuration where the position is screen size invariant.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    const handleResize = debounce(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current, containerProp);
      }
    });

    const containerWindow = ownerWindow(childrenRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp, containerProp]);

  React.useEffect(() => {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);

  return (
    <TransitionComponent
      nodeRef={childrenRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      appear={appear}
      in={inProp}
      timeout={timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          ref: handleRef,
          style: {
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...style,
            ...children.props.style,
          },
          ...childProps,
        });
      }}
    </TransitionComponent>
  );
});

Slide.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
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
   * An HTML element, or a function that returns one.
   * It's used to set the container the Slide is transitioning from.
   */
  container: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open) {
      const resolvedContainer = resolveContainer(props.container);

      if (resolvedContainer && resolvedContainer.nodeType === 1) {
        const box = resolvedContainer.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          return new Error(
            [
              'MUI: The `container` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      } else if (
        !resolvedContainer ||
        typeof resolvedContainer.getBoundingClientRect !== 'function' ||
        (resolvedContainer.contextElement != null &&
          resolvedContainer.contextElement.nodeType !== 1)
      ) {
        return new Error(
          [
            'MUI: The `container` prop provided to the component is invalid.',
            'It should be an HTML element instance.',
          ].join('\n'),
        );
      }
    }

    return null;
  }),
  /**
   * Direction the child node will enter from.
   * @default 'down'
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   * @default {
   *   enter: theme.transitions.easing.easeOut,
   *   exit: theme.transitions.easing.sharp,
   * }
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

export default Slide;
