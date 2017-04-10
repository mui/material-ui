// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from '../internal/Transition';
import { duration } from '../styles/transitions';
import customPropTypes from '../utils/customPropTypes';

export default class Fade extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * If `true`, the component will transition in.
     */
    in: PropTypes.bool,
    /**
     * Duration of the animation when the element is entering.
     */
    enterTransitionDuration: PropTypes.number, // eslint-disable-line react/sort-prop-types
    /**
     * Duration of the animation when the element is exiting.
     */
    leaveTransitionDuration: PropTypes.number,
    /**
     * Callback fired before the component enters.
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
     * Callback fired before the component exits.
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
    in: false,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
  };

  static contextTypes = {
    theme: customPropTypes.muiRequired,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    const { transitions } = this.context.theme;
    element.style.transition = transitions.create('opacity', {
      duration: this.props.enterTransitionDuration,
    });
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExit = (element) => {
    const { transitions } = this.context.theme;
    element.style.transition = transitions.create('opacity', {
      duration: this.props.leaveTransitionDuration,
    });
    element.style.opacity = 0;
    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  render() {
    const {
      children,
      enterTransitionDuration, // eslint-disable-line no-unused-vars
      leaveTransitionDuration, // eslint-disable-line no-unused-vars
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExit, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
