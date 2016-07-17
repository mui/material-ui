import React, { Component, PropTypes } from 'react';
import shallowEqual from 'recompose/shallowEqual';
import Transition from '../internal/Transition';

export default class Slide extends Component {
  static propTypes = {
    /**
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    direction: 'right',
    transitionDuration: 300,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  handleEnter = (element) => {
    element.style.transform = this.getTranslateValue();
    element.style.transition = this.context.theme.transitions.create('transform', `${this.props.transitionDuration}ms`);
  };

  handleEntering = (element) => {
    element.style.transform = 'translate3d(0, 0, 0)';
  };

  handleExiting = (element) => {
    element.style.transform = this.getTranslateValue();
  };

  getTranslateValue() {
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';
    return `translate3d(${x}, ${y}, 0)`;
  }

  render() {
    const {
      children,
      transitionDuration, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExiting={this.handleExiting}
        timeout={500}
        transitionAppear
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
