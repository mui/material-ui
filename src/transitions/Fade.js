// @flow weak

import React from 'react';
import type { Element } from 'react';
import Transition from '../internal/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import type { TransitionDuration, TransitionCallback } from '../internal/Transition';

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
   * If `true`, the component will transition in.
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
   * @ignore
   */
  theme?: Object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionDuration,
};

class Fade extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    in: false,
    transitionDuration: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };

  handleEnter = element => {
    element.style.opacity = 0;
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = element => {
    const { theme, transitionDuration } = this.props;
    element.style.transition = theme.transitions.create('opacity', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
    });
    element.style.WebkitTransition = theme.transitions.create('opacity', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
    });
    element.style.opacity = 1;
    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleExit = element => {
    const { theme, transitionDuration } = this.props;
    element.style.transition = theme.transitions.create('opacity', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
    });
    element.style.WebkitTransition = theme.transitions.create('opacity', {
      duration:
        typeof transitionDuration === 'number' ? transitionDuration : transitionDuration.enter,
    });
    element.style.opacity = 0;
    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  render() {
    const {
      children,
      transitionDuration,
      onEnter,
      onEntering,
      onExit,
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
        {...other}
      >
        {children}
      </Transition>
    );
  }
}

export default withTheme()(Fade);
