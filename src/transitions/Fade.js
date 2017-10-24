// @flow
// @inheritedComponent Transition

import React from 'react';
import type { Element } from 'react';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';
import type { TransitionDuration, TransitionCallback } from '../internal/transition';

type ProvidedProps = {
  appear: boolean,
  timeout: TransitionDuration,
  theme: Object,
};

export type Props = {
  /**
   * @ignore
   */
  appear?: boolean,
  /**
   * A single child content element.
   */
  children: Element<any>,
  /**
   * If `true`, the component will transition in.
   */
  in: boolean,
  /**
   * @ignore
   */
  onEnter?: TransitionCallback,
  /**
   * @ignore
   */
  onEntering?: TransitionCallback,
  /**
   * @ignore
   */
  onExit?: TransitionCallback,
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * @ignore
   */
  style?: Object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionDuration,
};

const reflow = node => node.scrollTop;

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Fade extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    appear: true,
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };

  handleEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    // $FlowFixMe - https://github.com/facebook/flow/pull/5161
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
    });
    node.style.opacity = '1';

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });
    // $FlowFixMe - https://github.com/facebook/flow/pull/5161
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
    });
    node.style.opacity = '0';

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const {
      appear,
      children,
      onEnter,
      onEntering,
      onExit,
      style: styleProp,
      theme,
      ...other
    } = this.props;

    const style = { ...styleProp };

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = '0';
    }

    return (
      <Transition
        appear={appear}
        style={style}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        {...other}
      >
        {children}
      </Transition>
    );
  }
}

export default withTheme()(Fade);
