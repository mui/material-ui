// @flow

import React from 'react';
import type { Element } from 'react';
import { findDOMNode } from 'react-dom';
import Transition from '../internal/Transition';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';
import type { TransitionDuration, TransitionCallback } from '../internal/Transition';

const GUTTER = 24;

// Translate the element so he can't be seen in the screen.
// Later, we gonna translate back the element to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, element: HTMLElement) {
  const { direction } = props;
  const rect = element.getBoundingClientRect();

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left}px)`;
  } else if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER}px)`;
  } else if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top}px)`;
  }

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

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
   * Direction the child element will enter from.
   */
  direction?: Direction,
  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in?: boolean,
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
  onEntered?: TransitionCallback,
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
  onExited?: TransitionCallback,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionDuration,
  /**
   * @ignore
   */
  theme?: Object,
};

class Slide extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    direction: 'down',
    transitionDuration: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };

  componentDidMount() {
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      const element = findDOMNode(this.transition);
      if (element instanceof HTMLElement) {
        const transform = getTranslateValue(this.props, element);
        element.style.transform = transform;
        element.style.webkitTransform = transform;
      }
    }
  }

  transition = null;

  handleEnter = element => {
    // Reset the transformation when needed.
    // That's triggering a reflow.
    if (element.style.transform) {
      element.style.transform = 'translate3d(0, 0, 0)';
      element.style.webkitTransform = 'translate3d(0, 0, 0)';
    }
    const transform = getTranslateValue(this.props, element);
    element.style.transform = transform;
    element.style.webkitTransform = transform;

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = element => {
    const { theme, transitionDuration } = this.props;
    element.style.transition = theme.transitions.create('transform', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
      easing: theme.transitions.easing.easeOut,
    });
    element.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
      easing: theme.transitions.easing.easeOut,
    });
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.webkitTransform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExit = element => {
    const { theme, transitionDuration } = this.props;
    element.style.transition = theme.transitions.create('transform', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.exit,
      easing: theme.transitions.easing.sharp,
    });
    element.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.exit,
      easing: theme.transitions.easing.sharp,
    });
    const transform = getTranslateValue(this.props, element);
    element.style.transform = transform;
    element.style.webkitTransform = transform;

    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  render() {
    const {
      children,
      onEnter,
      onEntering,
      onExit,
      transitionDuration,
      theme,
      ...other
    } = this.props;

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        timeout={transitionDuration}
        transitionAppear
        ref={node => {
          this.transition = node;
        }}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}

export default withTheme()(Slide);
