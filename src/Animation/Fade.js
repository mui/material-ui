import React, {Component, PropTypes} from 'react';
import Transition from 'react-overlays/lib/Transition';

// const reflow = (elem) => elem.offsetHeight;

export default class Fade extends Component {
  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create('opacity');
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
  };

  handleExiting = (element) => {
    element.style.opacity = 0;
  };

  render() {
    const {children, ...other} = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExiting={this.handleExiting}
        timeout={2000}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
