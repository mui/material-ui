// @flow
// @inheritedComponent CSSTransition

import React from 'react';
import type { Element } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import withTheme from '../styles/withTheme';
import type { TransitionCallback, TransitionClasses } from '../internal/transition';

// Only exported for tests.
export function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

export type TransitionDuration = number | { enter?: number, exit?: number } | 'auto';

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
   * If `true`, show the component; triggers the enter or exit animation.
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
  onEntered?: TransitionCallback,
  /**
   * @ignore
   */
  onExit?: TransitionCallback,
  /**
   * @ignore
   */
  onExiting?: TransitionCallback,
  /**
   * @ignore
   */
  onExited?: TransitionCallback,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * @ignore
   */
  style?: Object,
  /**
   * The animation classNames applied to the component as it enters or exits.
   * This property is a direct binding to [`CSSTransition.classNames`](https://reactcommunity.org/react-transition-group/#CSSTransition-prop-classNames).
   */
  transitionClasses?: TransitionClasses,
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
  timeout?: TransitionDuration,
};

/**
 * The Grow transition is used by the Popover component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Grow extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    appear: true,
    timeout: 'auto',
    transitionClasses: {},
  };

  autoTimeout = undefined;

  handleEnter = (node: HTMLElement) => {
    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    let duration = 0;

    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      this.autoTimeout = duration;
    } else if (typeof timeout === 'number') {
      duration = timeout;
    } else if (timeout) {
      duration = timeout.enter;
    } else {
      // The propType will warn in this case.
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
      }),
    ].join(',');

    node.style.opacity = '1';
    node.style.transform = getScale(1);

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    let duration = 0;

    if (timeout === 'auto') {
      duration = theme.transitions.getAutoHeightDuration(node.clientHeight);
      this.autoTimeout = duration;
    } else if (typeof timeout === 'number') {
      duration = timeout;
    } else if (timeout) {
      duration = timeout.exit;
    } else {
      // The propType will warn in this case.
    }

    node.style.transition = [
      theme.transitions.create('opacity', {
        duration,
      }),
      theme.transitions.create('transform', {
        duration: duration * 0.666,
        delay: duration * 0.333,
      }),
    ].join(',');

    node.style.opacity = '0';
    node.style.transform = getScale(0.75);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  addEndListener = (node, next: Function) => {
    let timeout;

    if (this.props.timeout === 'auto') {
      timeout = this.autoTimeout || 0;
    } else {
      timeout = this.props.timeout;
    }

    setTimeout(next, timeout);
  };

  render() {
    const {
      appear,
      children,
      onEnter,
      onEntering,
      onExit,
      rootRef,
      style: styleProp,
      transitionClasses,
      timeout,
      theme,
      ...other
    } = this.props;

    const style = { ...children.props.style, ...styleProp };

    // For server side rendering.
    if (!this.props.in || appear) {
      style.opacity = '0';
    }

    return (
      <CSSTransition
        classNames={transitionClasses}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        addEndListener={this.addEndListener}
        appear={appear}
        style={style}
        {...other}
        ref={rootRef}
      >
        {children}
      </CSSTransition>
    );
  }
}

export default withTheme()(Grow);
