import React, {Component, PropTypes} from 'react';
import Transition from 'react-overlays/lib/Transition';

export default class Fade extends Component {
  static propTypes = {
    /**
     * Used to control the transition. Set to true to reveal the component.
     */
    active: PropTypes.bool,
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    active: false,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.opacity = 0;
    element.style.transition = this.context.theme.transitions.create();
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
  };

  handleExiting = (element) => {
    element.style.opacity = 0;
  };

  render() {
    const {active, children, ...other} = this.props;


    return (
      <Transition
        in={active}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExiting={this.handleExiting}
        timeout={500}
        transitionAppear={true}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
