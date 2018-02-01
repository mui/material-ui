// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';

const transitionStyles = {
  entering: {
    transform: 'scale(1)',
  },
  entered: {
    transform: 'scale(1)',
  },
};

/**
 * The Zoom transition is used by the SpeedDial component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Zoom extends React.Component {
  handleEntering = node => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    node.style.webkitTransition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    node.style.transitionDelay = `${this.props.enterDelay}ms`;

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = node => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });
    node.style.webkitTransition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const {
      appear,
      children,
      enterDelay,
      onEntering,
      onExit,
      style: styleProp,
      theme,
      ...other
    } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <Transition
        appear={appear}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        {...other}
      >
        {(state, childProps) => {
          return React.cloneElement(children, {
            style: {
              transform: 'scale(0)',
              ...transitionStyles[state],
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
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * The duration before the enter animation starts in milliseconds.
   */
  enterDelay: PropTypes.number,
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
  onEntering: PropTypes.func,
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
  appear: true,
  enterDelay: 0,
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(Zoom);
