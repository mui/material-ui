// @flow
import React, {Component, Element, PropTypes} from 'react';
import Transition from '../internal/Transition';

type Props = {
  children?: Element<any>,
  /**
   * Set to true to transition in
   */
  in?: boolean,
  /**
   * Callback fired before the component is entering
   */
  onEnter?: TransitionHandler,
  /**
   * Callback fired when the component is entering
   */
  onEntering?: TransitionHandler,
  /**
   * Callback fired when the component has entered
   */
  onEntered?: TransitionHandler, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting
   */
  onExit?: TransitionHandler,
  /**
   * Callback fired when the component is exiting
   */
  onExiting?: TransitionHandler,
  /**
   * Callback fired when the component has exited
   */
  onExited?: TransitionHandler, // eslint-disable-line react/sort-prop-types
};

export default class Fade extends Component<void, Props, void> {
  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  props:Props;

  handleEnter: TransitionHandler = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create('opacity');
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  };

  handleEntering: TransitionHandler = (element) => {
    element.style.opacity = 1;
    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  handleExit: TransitionHandler = (element) => {
    element.style.opacity = 0;
    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  render(): Element<any> {
    const {
      children,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExit, // eslint-disable-line no-unused-vars
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
