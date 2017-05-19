// @flow weak

import React, { Element, Component } from 'react';
import Transition from '../internal/Transition';
import { duration } from '../styles/transitions';
import customPropTypes from '../utils/customPropTypes';

type DefaultProps = {
  in: boolean,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
};

type Props = DefaultProps & {
  children?: Element<*>,
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean,
  /**
   * Duration of the animation when the element is entering.
   */
  enterTransitionDuration?: number, // eslint-disable-line react/sort-prop-types
  /**
   * Duration of the animation when the element is exiting.
   */
  leaveTransitionDuration?: number,
  /**
   * Callback fired before the component enters.
   */
  onEnter?: Function,
  /**
   * Callback fired when the component is entering.
   */
  onEntering?: Function,
  /**
   * Callback fired when the component has entered.
   */
  onEntered?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component exits.
   */
  onExit?: Function,
  /**
   * Callback fired when the component is exiting.
   */
  onExiting?: Function,
  /**
   * Callback fired when the component has exited.
   */
  onExited?: Function, // eslint-disable-line react/sort-prop-types
};

class Fade extends Component<DefaultProps, Props, void> {
  props: Props;

  static defaultProps: DefaultProps = {
    in: false,
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    const { transitions } = this.context.styleManager.theme;
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
    const { transitions } = this.context.styleManager.theme;
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

Fade.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default Fade;
