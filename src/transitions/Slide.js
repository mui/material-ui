// @flow weak

import React, { Component, PropTypes } from 'react';
import Transition from '../internal/Transition';
import customPropTypes from '../utils/customPropTypes';
import { easing, durations } from '../styles/transitions';

function getTranslateValue(props, element) {
  const { direction } = props;
  const rect = element.getBoundingClientRect();

  if (direction === 'left') {
    return `translate3d(${rect.right + rect.width}px, 0, 0)`;
  } else if (direction === 'right') {
    return `translate3d(${0 - (rect.left + rect.width)}px, 0, 0)`;
  } else if (direction === 'up') {
    return `translate3d(0, ${rect.bottom + rect.height}px, 0)`;
  } else if (direction === 'down') {
    return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
  }

  return 'translate3d(0, 0, 0)';
}

export default class Slide extends Component {
  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    enterTransitionDuration: PropTypes.number,
    leaveTransitionDuration: PropTypes.number,
    /**
     * Set to slide in by a fixed number of pixels or %.
     */
    offset: PropTypes.string,
    /**
     * Callback fired before the component is entering.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the component is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the component has entered.
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the component is exiting.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the component is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the component has exited.
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
  };

  static defaultProps = {
    direction: 'down',
    enterTransitionDuration: durations.enteringScreen,
    leaveTransitionDuration: durations.leavingScreen,
  };

  static contextTypes = {
    theme: customPropTypes.muiRequired,
  };

  handleEnter = (element) => {
    element.style.transform = getTranslateValue(this.props, element);
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = (element) => {
    const { transitions } = this.context.theme;
    element.style.transition = transitions.create(
      'transform',
      `${this.props.enterTransitionDuration}ms`,
      '0ms',
      easing.easeOut,
    );
    element.style.transform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExiting = (element) => {
    const { transitions } = this.context.theme;
    element.style.transition = transitions.create(
      'transform',
      `${this.props.leaveTransitionDuration}ms`,
      '0ms',
      easing.sharp,
    );
    element.style.transform = getTranslateValue(this.props, element);
    if (this.props.onExiting) {
      this.props.onExiting(element);
    }
  };

  render() {
    const {
      children,
      offset, // eslint-disable-line no-unused-vars
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExiting, // eslint-disable-line no-unused-vars
      enterTransitionDuration, // eslint-disable-line no-unused-vars
      leaveTransitionDuration, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExiting={this.handleExiting}
        timeout={500}
        transitionAppear
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
