// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import { reflow, getTransitionProps } from './utils';

const styles = {
  entering: {
    transform: 'scale(1)',
  },
  entered: {
    transform: 'scale(1)',
  },
};

/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](https://material-ui-next.com/demos/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Zoom extends React.Component {
  handleEnter = node => {
    const { theme } = this.props;
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps(this.props, {
      mode: 'enter',
    });
    node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleExit = node => {
    const { theme } = this.props;
    const transitionProps = getTransitionProps(this.props, {
      mode: 'exit',
    });
    node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const { children, onEnter, onExit, style: styleProp, theme, ...other } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <Transition appear onEnter={this.handleEnter} onExit={this.handleExit} {...other}>
        {(state, childProps) => {
          return React.cloneElement(children, {
            style: {
              transform: 'scale(0)',
              willChange: 'transform',
              ...styles[state],
              ...style,
            },
            ...childProps,
          });
        }}
      </Transition>
    );
  }
}

Zoom.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
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

Zoom.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(Zoom);
