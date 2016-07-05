// @flow
import React, {Component, Element} from 'react';
import Transition from 'react-overlays/lib/Transition';

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Object,
  onExited?: TransitionHandler,
};

export default class Fade extends Component<void, Props, void> {
  static contextTypes = {
    theme: Object,
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

  render():Element {
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
