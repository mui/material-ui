// @flow
import React, {Component, Element, PropTypes} from 'react';
import shallowEqual from 'recompose/shallowEqual';
import Transition from '../internal/Transition';

type DefaultProps = {
  direction: 'left' | 'right' | 'up' | 'down',
  transitionDuration: number,
};

type Props = {
  /**
   * Can be used, for instance, to render a letter inside the avatar.
   */
  children?: Element<any>,
  /**
   * The CSS class name of the root element.
   */
  className?: string,
  direction: 'left' | 'right' | 'up' | 'down',
  transitionDuration: number,
};


export default class Slide extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    theme: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    direction: 'right',
    transitionDuration: 300,
  };
 
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  handleEnter:TransitionHandler = (element) => {
    element.style.transform = this.getTranslateValue();
    element.style.transition = this.context.theme.transitions.create('transform', `${this.props.transitionDuration}ms`);
  };

  handleEntering:TransitionHandler = (element) => {
    element.style.transform = 'translate3d(0, 0, 0)';
  };

  handleExiting:TransitionHandler = (element) => {
    element.style.transform = this.getTranslateValue();
  };

  getTranslateValue() {
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';
    return `translate3d(${x}, ${y}, 0)`;
  }

  render(): Element<any> {
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
        transitionAppear={true}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}
