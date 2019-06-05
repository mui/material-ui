import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import debounce from 'debounce'; // < 1kb payload overhead when lodash/debounce is > 3kb.
import { Transition } from 'react-transition-group';
import { elementAcceptingRef } from '@material-ui/utils';
import { useForkRef } from '../utils/reactHelpers';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';
import { reflow, getTransitionProps } from '../transitions/utils';

const GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(direction, node) {
  const rect = node.getBoundingClientRect();

  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = window.getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform
      .split('(')[1]
      .split(')')[0]
      .split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  }

  if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  }

  if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  }

  // direction === 'down'
  return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
}

export function setTranslateValue(direction, node) {
  const transform = getTranslateValue(direction, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}

const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen,
};

/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Slide = React.forwardRef(function Slide(props, ref) {
  const {
    children,
    direction = 'down',
    in: inProp,
    onEnter,
    onEntering,
    onExit,
    onExited,
    style,
    theme,
    timeout = defaultTimeout,
    ...other
  } = props;

  const childrenRef = React.useRef(null);
  /**
   * used in cloneElement(children, { ref: handleRef })
   */
  const handleOwnRef = React.useCallback(instance => {
    // #StrictMode ready
    childrenRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRefIntermediary = useForkRef(children.ref, handleOwnRef);
  const handleRef = useForkRef(handleRefIntermediary, ref);

  const handleEnter = () => {
    const node = childrenRef.current;
    setTranslateValue(direction, node);
    reflow(node);

    if (onEnter) {
      onEnter(node);
    }
  };

  const handleEntering = () => {
    const node = childrenRef.current;
    const transitionProps = getTransitionProps(
      { timeout, style },
      {
        mode: 'enter',
      },
    );
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.webkitTransform = 'translate(0, 0)';
    node.style.transform = 'translate(0, 0)';
    if (onEntering) {
      onEntering(node);
    }
  };

  const handleExit = () => {
    const node = childrenRef.current;
    const transitionProps = getTransitionProps(
      { timeout, style },
      {
        mode: 'exit',
      },
    );
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    node.style.transition = theme.transitions.create('transform', {
      ...transitionProps,
      easing: theme.transitions.easing.sharp,
    });
    setTranslateValue(direction, node);

    if (onExit) {
      onExit(node);
    }
  };

  const handleExited = () => {
    const node = childrenRef.current;
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  };

  const updatePosition = React.useCallback(() => {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current);
    }
  }, [direction]);

  React.useEffect(() => {
    // Skip configuration where the position is screen size invariant.
    if (!inProp && direction !== 'down' && direction !== 'right') {
      const handleResize = debounce(() => {
        if (childrenRef.current) {
          setTranslateValue(direction, childrenRef.current);
        }
      }, 166); // Corresponds to 10 frames at 60 Hz.

      window.addEventListener('resize', handleResize);

      return () => {
        handleResize.clear();
        window.removeEventListener('resize', handleResize);
      };
    }

    return undefined;
  }, [direction, inProp]);

  React.useEffect(() => {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);

  return (
    <Transition
      onEnter={handleEnter}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      appear
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
    </Transition>
  );
});

Slide.propTypes = {
  /**
   * A single child content element.
   */
  children: elementAcceptingRef,
  /**
   * Direction the child node will enter from.
   */
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
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
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

export default withTheme(Slide);
