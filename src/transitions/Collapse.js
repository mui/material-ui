// @flow
// @inheritedComponent Transition

import React from 'react';
import classNames from 'classnames';
import type { Node } from 'react';
import Transition from 'react-transition-group/Transition';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import type { TransitionCallback } from '../internal/transition';

export const styles = (theme: Object) => ({
  container: {
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
  },
  entered: {
    height: 'auto',
  },
});

export type TransitionDuration = number | { enter?: number, exit?: number } | 'auto';

type ProvidedProps = {
  appear: boolean,
  classes: Object,
  collapsedHeight: string,
  transitionDuration: TransitionDuration,
  theme: Object,
};

export type Props = {
  /**
   * @ignore
   */
  appear?: boolean,
  /**
   * The content node to be collapsed.
   */
  children: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * The height of the container when collapsed.
   */
  collapsedHeight?: string,
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
  style?: Object,
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

const reflow = node => node.scrollTop;

class Collapse extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    appear: false,
    collapsedHeight: '0px',
    transitionDuration: duration.standard,
  };

  wrapper = null;
  autoTransitionDuration = undefined;

  handleEnter = (node: HTMLElement) => {
    node.style.height = this.props.collapsedHeight;

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = (node: HTMLElement) => {
    const { transitionDuration, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (transitionDuration === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof transitionDuration === 'number') {
      node.style.transitionDuration = `${transitionDuration}ms`;
    } else if (transitionDuration) {
      node.style.transitionDuration = `${transitionDuration.enter}ms`;
    } else {
      // The propType will warn in this case.
    }

    node.style.height = `${wrapperHeight}px`;

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleEntered = (node: HTMLElement) => {
    node.style.height = 'auto';

    if (this.props.onEntered) {
      this.props.onEntered(node);
    }
  };

  handleExit = (node: HTMLElement) => {
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
    reflow(node);
    node.style.height = `${wrapperHeight}px`;
    reflow(node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExiting = (node: HTMLElement) => {
    const { transitionDuration, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    reflow(node);

    if (transitionDuration === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof transitionDuration === 'number') {
      node.style.transitionDuration = `${transitionDuration}ms`;
    } else if (transitionDuration) {
      node.style.transitionDuration = `${transitionDuration.exit}ms`;
    } else {
      // The propType will warn in this case.
    }

    reflow(node);

    node.style.height = this.props.collapsedHeight;

    reflow(node);

    if (this.props.onExiting) {
      this.props.onExiting(node);
    }
  };

  addEndListener = (node, next: Function) => {
    let timeout;

    if (this.props.transitionDuration === 'auto') {
      timeout = this.autoTransitionDuration || 0;
    } else {
      timeout = this.props.transitionDuration;
    }

    setTimeout(next, timeout);
  };

  render() {
    const {
      appear,
      children,
      classes,
      collapsedHeight,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      style,
      transitionDuration,
      theme,
      ...other
    } = this.props;

    return (
      <Transition
        appear={appear}
        onEntering={this.handleEntering}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExiting={this.handleExiting}
        onExit={this.handleExit}
        addEndListener={this.addEndListener}
        style={{ minHeight: collapsedHeight, ...style }}
        {...other}
      >
        {state => {
          return (
            <div
              className={classNames(classes.container, {
                [classes.entered]: state === 'entered',
              })}
            >
              <div
                ref={node => {
                  this.wrapper = node;
                }}
              >
                {children}
              </div>
            </div>
          );
        }}
      </Transition>
    );
  }
}

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiCollapse',
})(Collapse);
