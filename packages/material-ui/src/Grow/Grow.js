import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import withTheme from '../styles/withTheme';
import { reflow, getTransitionProps } from '../transitions/utils';
import { useForkRef } from '../utils/reactHelpers';

function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}

const styles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    // Use translateZ to scrolling issue on Chrome.
    transform: `${getScale(1)} translateZ(0)`,
  },
};

/**
 * The Grow transition is used by the [Tooltip](/components/tooltips/) and
 * [Popover](/components/popover/) components.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Grow = React.forwardRef(function Grow(props, ref) {
  const { children, in: inProp, onEnter, onExit, style, theme, timeout = 'auto', ...other } = props;
  const timer = React.useRef();
  const autoTimeout = React.useRef();
  const handleRef = useForkRef(children.ref, ref);

  const handleEnter = node => {
    reflow(node); // So the animation always start from the start.

    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );
    let duration = 0;
    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
        delay,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay,
      }),
    ].join(',');

    if (onEnter) {
      onEnter(node);
    }
  };

  const handleExit = node => {
    let duration = 0;

    const { duration: transitionDuration, delay } = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );
    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration;
    } else {
      duration = transitionDuration;
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
        delay,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: delay || duration * 0.333,
      }),
    ].join(',');

    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (onExit) {
      onExit(node);
    }
  };

  const addEndListener = (_, next) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <Transition
      appear
      in={inProp}
      onEnter={handleEnter}
      onExit={handleExit}
      addEndListener={addEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            transform: getScale(0.75),
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles[state],
            ...style,
            ...children.props.style,
          },
          ref: handleRef,
          ...childProps,
        });
      }}
    </Transition>
  );
});

Grow.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.element,
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
  onExit: PropTypes.func,
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
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
};

Grow.muiSupportAuto = true;

export default withTheme(Grow);
