// @flow weak

import React, { Component, PropTypes } from 'react';
import Transition from '../internal/Transition';

export default class Fade extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * Set to true to transition in.
     */
    in: PropTypes.bool,
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
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    in: false,
    transitionDuration: 300,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create(
      'opacity',
      `${this.props.transitionDuration}ms`
    );
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  handleExit = (element) => {
    element.style.opacity = 0;
    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  render() {
    const {
      children,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExit, // eslint-disable-line no-unused-vars
      transitionDuration, // eslint-disable-line no-unused-vars
      ...other,
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
