// @flow
// @inheritedComponent Transition

import React from 'react';
import type { Element } from 'react';
import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import Transition from 'react-transition-group/Transition';
import withTheme from '../styles/withTheme';
import { duration } from '../styles/transitions';
import type { TransitionDuration, TransitionCallback } from '../internal/transition';

const GUTTER = 24;

// Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`
function getTranslateValue(props, node: HTMLElement) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();

  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = window.getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('transform');
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform
      .split('(')[1]
      .split(')')[0]
      .split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  } else if (direction === 'right') {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  } else if (direction === 'up') {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  }

  // direction === 'down
  return `translate3d(0, ${0 - (rect.top + rect.height)}px, 0)`;
}

export function setTranslateValue(props: Object, node: HTMLElement | Object) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.transform = transform;
    node.style.webkitTransform = transform;
  }
}

export type Direction = 'left' | 'right' | 'up' | 'down';

type ProvidedProps = {
  timeout: TransitionDuration,
  theme: Object,
};

export type Props = {
  /**
   * A single child content element.
   */
  children: Element<any>,
  /**
   * Direction the child node will enter from.
   */
  direction?: Direction,
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
   * @ignore
   */
  style?: Object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionDuration,
  /**
   * @ignore
   */
  theme?: Object,
};

type State = {
  firstMount: boolean,
};

const reflow = node => node.scrollTop;

class Slide extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    direction: 'down',
    timeout: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen,
    },
  };

  state = {
    // We use this state to handle the server-side rendering.
    firstMount: true,
  };

  componentWillReceiveProps() {
    this.setState({
      firstMount: false,
    });
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  transition = null;

  handleResize = debounce(() => {
    // Skip configuration where the position is screen size invariant.
    if (this.props.in || this.props.direction === 'down' || this.props.direction === 'right') {
      return;
    }

    const node = findDOMNode(this.transition);
    if (node instanceof HTMLElement) {
      setTranslateValue(this.props, node);
    }
  }, 166);

  handleEnter = (node: HTMLElement) => {
    setTranslateValue(this.props, node);
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      easing: theme.transitions.easing.easeOut,
    });
    // $FlowFixMe - https://github.com/facebook/flow/pull/5161
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      easing: theme.transitions.easing.easeOut,
    });
    node.style.transform = 'translate3d(0, 0, 0)';
    node.style.webkitTransform = 'translate3d(0, 0, 0)';
    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = (node: HTMLElement) => {
    const { theme, timeout } = this.props;
    node.style.transition = theme.transitions.create('transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      easing: theme.transitions.easing.sharp,
    });
    // $FlowFixMe - https://github.com/facebook/flow/pull/5161
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      easing: theme.transitions.easing.sharp,
    });
    setTranslateValue(this.props, node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const { children, onEnter, onEntering, onExit, style: styleProp, theme, ...other } = this.props;

    const style = { ...styleProp };

    if (!this.props.in && this.state.firstMount) {
      style.visibility = 'hidden';
    }

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Transition
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          appear
          style={style}
          {...other}
          ref={node => {
            this.transition = node;
          }}
        >
          {children}
        </Transition>
      </EventListener>
    );
  }
}

export default withTheme()(Slide);
