// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Transition from '../internal/Transition';
import customPropTypes from '../utils/customPropTypes';
import { duration } from '../styles/transitions';

function getTranslateValue(props, element) {
  const { direction } = props;
  const rect = element.getBoundingClientRect();

  if (direction === 'left') {
    return `translate3d(calc(100vw - ${rect.left}px), 0, 0)`;
  } else if (direction === 'right') {
    return `translate3d(${0 - (rect.left + rect.width)}px, 0, 0)`;
  } else if (direction === 'up') {
    return `translate3d(0, calc(100vh - ${rect.top}px), 0)`;
  }

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

class Slide extends Component {
  static defaultProps = {
    direction: 'down',
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
  };

  componentDidMount() {
    if (!this.props.in) {
      /* We need to set initial translate values of transition element
       * otherwise component will be shown when in=false.
       * transitions are handled by direct access to element,
       * so we need to access that same element too here.
       */
      const element = ReactDOM.findDOMNode(this.transition);
      // $FlowFixMe
      element.style.transform = getTranslateValue(this.props, element);
    }
  }

  transition = null;

  handleEnter = (element) => {
    element.style.transform = getTranslateValue(this.props, element);
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = (element) => {
    const { transitions } = this.context.styleManager.theme;
    element.style.transition = transitions.create('transform', {
      duration: this.props.enterTransitionDuration,
      easing: transitions.easing.easeOut,
    });
    element.style.transform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExiting = (element) => {
    const { transitions } = this.context.styleManager.theme;
    element.style.transition = transitions.create('transform', {
      duration: this.props.leaveTransitionDuration,
      easing: transitions.easing.sharp,
    });
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
        ref={(ref) => { this.transition = ref; }}
      >
        {children}
      </Transition>
    );
  }
}

Slide.propTypes = {
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Direction the child element will enter from.
   */
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  /**
   * Duration of the animation when the element is entering.
   */
  enterTransitionDuration: PropTypes.number,
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,
  /**
   * Duration of the animation when the element is exiting.
   */
  leaveTransitionDuration: PropTypes.number,
  /**
   * Slide in by a fixed number of pixels or %.
   */
  offset: PropTypes.string,
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

Slide.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default Slide;
