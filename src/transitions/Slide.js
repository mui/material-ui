// @flow

import React, { PureComponent } from 'react';
import type { Element as ReactElement } from 'react'; // global Element used below.
import { findDOMNode } from 'react-dom';
import Transition from '../internal/Transition';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';
import type { TransitionCallback } from '../internal/Transition';

const GUTTER = 24;

// Translate the element so he can't be seen in the screen.
// Later, we gonna translate back the element to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, element: Element) {
  const { direction } = props;
  const rect = element.getBoundingClientRect();

  if (direction === 'left') {
    return `translate3d(calc(100vw - ${rect.left}px), 0, 0)`;
  } else if (direction === 'right') {
    return `translate3d(${0 - (rect.left + rect.width + GUTTER)}px, 0, 0)`;
  } else if (direction === 'up') {
    return `translate3d(0, calc(100vh - ${rect.top}px), 0)`;
  }

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

type Direction = 'left' | 'right' | 'up' | 'down';

type DefaultProps = {
  direction: Direction,
  enterTransitionDuration: number,
  leaveTransitionDuration: number,
  theme: Object,
};

export type Props = {
  /**
   * @ignore
   */
  children?: ReactElement<*>,
  /**
   * Direction the child element will enter from.
   */
  direction?: Direction,
  /**
   * Duration of the animation when the element is entering.
   */
  enterTransitionDuration?: number,
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: boolean,
  /**
   * Duration of the animation when the element is exiting.
   */
  leaveTransitionDuration?: number,
  /**
   * Slide in by a fixed number of pixels or %.
   */
  offset?: string,
  /**
   * Callback fired before the component enters.
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the component is entering.
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the component has entered.
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component exits.
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the component is exiting.
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the component has exited.
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * @ignore
   */
  theme?: Object,
};

type AllProps = DefaultProps & Props;

class Slide extends PureComponent<DefaultProps, AllProps, void> {
  props: AllProps;

  static defaultProps: DefaultProps = {
    direction: 'down',
    enterTransitionDuration: duration.enteringScreen,
    leaveTransitionDuration: duration.leavingScreen,
    theme: {},
  };

  componentDidMount() {
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      const element = findDOMNode(this.transition);
      if (element instanceof HTMLElement) {
        const transform = getTranslateValue(this.props, element);
        element.style.transform = transform;
        // $FlowFixMe
        element.style.WebkitTransform = transform;
      }
    }
  }

  transition = null;

  handleEnter = element => {
    // Reset the transformation when needed.
    // That's triggering a reflow.
    if (element.style.transform) {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.WebkitTransform = 'translate3d(0, 0, 0)';
    }
    const transform = getTranslateValue(this.props, element);
    element.style.transform = transform;
    element.style.WebkitTransform = transform;

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = element => {
    const { transitions } = this.props.theme;
    element.style.transition = transitions.create('transform', {
      duration: this.props.enterTransitionDuration,
      easing: transitions.easing.easeOut,
    });
    element.style.WebkitTransition = transitions.create('-webkit-transform', {
      duration: this.props.enterTransitionDuration,
      easing: transitions.easing.easeOut,
    });
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.WebkitTransform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExit = element => {
    const { transitions } = this.props.theme;
    element.style.transition = transitions.create('transform', {
      duration: this.props.leaveTransitionDuration,
      easing: transitions.easing.sharp,
    });
    element.style.WebkitTransition = transitions.create('-webkit-transform', {
      duration: this.props.leaveTransitionDuration,
      easing: transitions.easing.sharp,
    });
    const transform = getTranslateValue(this.props, element);
    element.style.transform = transform;
    element.style.WebkitTransform = transform;

    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  render() {
    const {
      children,
      offset,
      onEnter,
      onEntering,
      onExit,
      enterTransitionDuration,
      leaveTransitionDuration,
      theme,
      ...other
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        timeout={Math.max(enterTransitionDuration, leaveTransitionDuration) + 10}
        transitionAppear
        {...other}
        ref={ref => {
          this.transition = ref;
        }}
      >
        {children}
      </Transition>
    );
  }
}

export default withTheme(Slide);
