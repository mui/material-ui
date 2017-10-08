// @flow

import React from 'react';
import type { Element } from 'react';
import withTheme from '../styles/withTheme';
import Transition from '../internal/Transition';
import type { TransitionCallback } from '../internal/Transition';

// Only exported for tests.
export function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

export type TransitionDuration = number | { enter?: number, exit?: number } | 'auto';

type ProvidedProps = {
  transitionDuration: TransitionDuration,
  theme: Object,
};

export type Props = {
  /**
   * A single child content element.
   */
  children?: Element<any>,
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
  onEntered?: TransitionCallback,
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
  onExited?: TransitionCallback,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionDuration,
};

/**
 * Grow transition used by popovers such as Menu.
 */
class Grow extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    transitionDuration: 'auto',
  };

  autoTransitionDuration = undefined;

  handleEnter = (element: HTMLElement) => {
    element.style.opacity = '0';
    element.style.transform = getScale(0.75);

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }

    const { theme, transitionDuration } = this.props;
    let duration = 0;

    if (transitionDuration === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = duration;
    } else if (typeof transitionDuration === 'number') {
      duration = transitionDuration;
    } else if (transitionDuration) {
      duration = transitionDuration.enter;
    } else {
      // The propType will warn in this case.
    }

    element.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
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
    const { theme, transitionDuration } = this.props;
    let duration = 0;

    if (transitionDuration === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = duration;
    } else if (typeof transitionDuration === 'number') {
      duration = transitionDuration;
    } else if (transitionDuration) {
      duration = transitionDuration.exit;
    } else {
      // The propType will warn in this case.
    }

    element.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: duration * 0.333,
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
      return this.autoTransitionDuration || 0;
    }
    return this.props.transitionDuration;
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

export default withTheme()(Grow);
