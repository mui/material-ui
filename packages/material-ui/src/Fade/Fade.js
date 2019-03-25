// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import { reflow, getTransitionProps } from '../transitions/utils';

const styles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

/**
 * The Fade transition is used by the [Modal](/utils/modal/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
function Fade(props) {
  const { children, in: inProp, onEnter, onExit, style, theme, ...other } = props;

  const handleEnter = node => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(props, {
      mode: 'enter',
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onEnter) {
      onEnter(node);
    }
  };

  const handleExit = node => {
    const transitionProps = getTransitionProps(props, {
      mode: 'exit',
    });
    node.style.webkitTransition = theme.transitions.create('opacity', transitionProps);
    node.style.transition = theme.transitions.create('opacity', transitionProps);

    if (onExit) {
      onExit(node);
    }
  };

  return (
    <Transition appear in={inProp} onEnter={handleEnter} onExit={handleExit} {...other}>
      {(state, childProps) => {
        return React.cloneElement(children, {
          style: {
            opacity: 0,
            visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
            ...styles[state],
            ...style,
            ...children.props.style,
          },
          ...childProps,
        });
      }}
    </Transition>
  );
}

Fade.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.element,
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
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Fade.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme(Fade);
