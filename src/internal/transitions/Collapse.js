import React, {Component, PropTypes} from 'react';
import Transition from 'react-overlays/lib/Transition';

// const reflow = (elem) => elem.offsetHeight;

export default class Collapse extends Component {
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
    element.style.height = 0;
    element.style.transition = this.context.theme.transitions.create('height');
  };

  handleEntering = (element) => {
    this.open(element);
    element.style.height = 1;
  };

  handleEntered = (element) => {
    this.setAutoHeight(element);
  };

  handleExiting = (element) => {
    element.style.height = 0;
  };

  open(element) {
    element.style.height = `${this.refs.wrapper.clientHeight}px`;
  }

  render() {
    const {children, ...other} = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExiting={this.handleExiting}
        timeout={300}
        {...other}
      >
        <div>
          <div ref={(c) => this.wrapper = c}>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}
