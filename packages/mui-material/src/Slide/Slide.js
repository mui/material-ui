'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import chainPropTypes from '@mui/utils/chainPropTypes';
import HTMLElementType from '@mui/utils/HTMLElementType';
import elementAcceptingRef from '@mui/utils/elementAcceptingRef';
import getReactElementRef from '@mui/utils/getReactElementRef';
import isLayoutSupported from '../utils/isLayoutSupported';
import debounce from '../utils/debounce';
import useForkRef from '../utils/useForkRef';
import { useTheme } from '../zero-styled';
import { normalizedTransitionCallback, reflow, getTransitionProps } from '../transitions/utils';
import { ownerWindow } from '../utils';

const hiddenStyles = { visibility: 'hidden' };

// Translate the node so it can't be seen on the screen.
// Later, we're going to translate the node back to its original location with `none`.
function getTranslateValue(direction, node, resolvedContainer) {
  const containerRect = resolvedContainer && resolvedContainer.getBoundingClientRect();
  const containerWindow = ownerWindow(node);

  // Clear the inline transform and transition before reading layout and computed
  // style so we compute from the element's natural position, not its previous
  // off-screen translation. The transition must also be cleared, otherwise the
  // browser may report an animated intermediate value from a still-running
  // enter transition when reading getComputedStyle during exit.
  const previousTransform = node.style.transform;
  const previousTransition = node.style.transition;
  node.style.transition = '';
  node.style.transform = '';
  const rect = node.getBoundingClientRect();
  const computedStyle = containerWindow.getComputedStyle(node);
  const transform = computedStyle.getPropertyValue('transform');
  node.style.transform = previousTransform;
  node.style.transition = previousTransition;

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
    ...other
  } = props;

  const childrenRef = React.useRef(null);
  const handleRef = useForkRef(getReactElementRef(children), childrenRef, ref);

  const handleEnter = normalizedTransitionCallback(childrenRef, (node, isAppearing) => {
    setTranslateValue(direction, node, containerProp);
    reflow(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback(childrenRef, (node, isAppearing) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'enter',
      },
    );

    node.style.transition = theme.transitions.create('transform', transitionProps);

    node.style.transform = 'none';
    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback(childrenRef, onEntered);
  const handleExiting = normalizedTransitionCallback(childrenRef, onExiting);

  const handleExit = normalizedTransitionCallback(childrenRef, (node) => {
    const transitionProps = getTransitionProps(
      { timeout, style, easing: easingProp },
      {
        mode: 'exit',
      },
    );

    node.style.transition = theme.transitions.create('transform', transitionProps);

    setTranslateValue(direction, node, containerProp);

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(childrenRef, (node) => {
    // No need for transitions when the component is hidden
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
    <Transition
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
      {/* Ensure "ownerState" is not forwarded to the child DOM element when a direct HTML element is used. This avoids unexpected behavior since "ownerState" is intended for internal styling, component props and not as a DOM attribute. */}
      {(state, { ownerState, ...restChildProps }) => {
        let childStyle;
        if (state === 'exited' && !inProp) {
          childStyle =
            style || children.props.style
              ? { visibility: 'hidden', ...style, ...children.props.style }
              : hiddenStyles;
        } else if (style && children.props.style) {
          childStyle = { ...style, ...children.props.style };
        } else {
          childStyle = style || children.props.style;
        }

        return React.cloneElement(children, {
          ref: handleRef,
          style: childStyle,
          ...restChildProps,
        });
      }}
    </Transition>
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

        if (process.env.NODE_ENV !== 'production') {
          if (
            isLayoutSupported() &&
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
