// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import withTheme from '../styles/withTheme';
import Transition from '../internal/Transition';
import type { TransitionCallback } from '../internal/Transition';

// only exported for tests
export function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

type DefaultProps = {
  theme: Object,
  transitionDuration: 'auto',
};

export type Props = {
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Callback fired before the component is entering
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the component is entering
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the component has entered
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the component is exiting
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the component has exited
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * Set to 'auto' to automatically calculate transition time based on height
   */
  transitionDuration?: number | 'auto',
};

type AllProps = DefaultProps & Props;

/**
 * Grow transition used by popovers such as Menu.
 */
class Grow extends Component<DefaultProps, AllProps, void> {
  props: AllProps;
  static defaultProps: DefaultProps = {
    theme: {},
    transitionDuration: 'auto',
  };

  autoTransitionDuration = undefined;

  handleEnter = (element: HTMLElement) => {
    element.style.opacity = '0';
    element.style.transform = getScale(0.75);

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }

    let { transitionDuration } = this.props;
    const { transitions } = this.props.theme;

    if (transitionDuration === 'auto') {
      transitionDuration = transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = transitionDuration;
    }

    element.style.transition = [
      transitions.create('opacity', {
        duration: transitionDuration,
      }),
      transitions.create('transform', {
        duration: transitionDuration * 0.666,
      }),
    ].join(',');
  };

  handleEntering = (element: HTMLElement) => {
    element.style.opacity = '1';
    element.style.transform = getScale(1);

    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExit = (element: HTMLElement) => {
    let { transitionDuration } = this.props;
    const { transitions } = this.props.theme;

    if (transitionDuration === 'auto') {
      transitionDuration = transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = transitionDuration;
    }

    element.style.transition = [
      transitions.create('opacity', {
        duration: transitionDuration,
      }),
      transitions.create('transform', {
        duration: transitionDuration * 0.666,
        delay: transitionDuration * 0.333,
      }),
    ].join(',');

    element.style.opacity = '0';
    element.style.transform = getScale(0.75);

    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  handleRequestTimeout = () => {
    if (this.props.transitionDuration === 'auto') {
      return (this.autoTransitionDuration || 0) + 20;
    }
    return this.props.transitionDuration + 20;
  };

  render() {
    const {
      children,
      transitionDuration,
      onEnter,
      onEntering,
      onExit,
      rootRef,
      theme,
      ...other
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onRequestTimeout={this.handleRequestTimeout}
        transitionAppear
        {...other}
        ref={rootRef}
      >
        {children}
      </Transition>
    );
  }
}

export default withTheme(Grow);
