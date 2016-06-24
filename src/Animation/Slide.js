import React, {Component, PropTypes} from 'react';
import Transition from 'react-overlays/lib/Transition';

export default class Slide extends Component {
  static propTypes = {
    /**
     * Used to control the transition. Set to true to reveal the component.
     */
    active: PropTypes.bool,
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    duration: PropTypes.number,
    fade: PropTypes.bool,
  };

  static defaultProps = {
    active: false,
    direction: 'right',
    duration: 300,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  getTranslateValue() {
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';
    return `translate3d(${x}, ${y}, 0)`;
  }

  handleEnter = (element) => {
    if (this.props.fade) {
      element.style.opacity = 0;
    }
    element.style.transform = this.getTranslateValue();
    element.style.transition = this.context.theme.transitions.create('all', `${this.props.duration}ms`);
  };

  handleEntering = (element) => {
    if (this.props.fade) {
      element.style.opacity = 1;
    }
    element.style.transform = 'translate3d(0, 0, 0)';
  };

  handleExiting = (element) => {
    if (this.props.fade) {
      element.style.opacity = 0;
    }
    element.style.transform = this.getTranslateValue();
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
