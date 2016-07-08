// @flow
import React, {Component, PropTypes, Element} from 'react';
import Transition from '../Transition';

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Element<any>,
  onExited?: TransitionHandler,
};

export default class Fade extends Component<void, Props, void> {
  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  props:Props

  handleEnter:TransitionHandler = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create('opacity');
  };

  handleEntering:TransitionHandler = (element) => {
    element.style.opacity = 1;
  };

  handleExit:TransitionHandler = (element) => {
    element.style.opacity = 0;
  };

  render(): Element<any> {
    const {children, ...other} = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        timeout={2000}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
