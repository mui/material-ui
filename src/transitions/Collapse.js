// @flow

import React from 'react';
import type { Node } from 'react';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import Transition from '../internal/Transition';
import type { TransitionCallback } from '../internal/Transition';

const reflow = elem => elem.offsetHeight;

export const styles = (theme: Object) => ({
  container: {
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
  },
  entered: {
    height: 'auto',
    transitionDuration: '0ms',
  },
});

export type TransitionDuration = number | { enter?: number, exit?: number } | 'auto';

type ProvidedProps = {
  classes: Object,
  collapsedHeight: string,
  transitionDuration: TransitionDuration,
  theme: Object,
};

export type Props = {
  /**
   * The content node to be collapsed.
   */
  children?: Node,
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
  in?: boolean,
  /**
   * Callback fired before the component is entering.
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
   * Callback fired before the component is exiting.
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
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: TransitionDuration,
};

class Collapse extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    collapsedHeight: '0px',
    in: false,
    transitionDuration: duration.standard,
  };

  wrapper = null;
  autoTransitionDuration = undefined;

  handleEnter = element => {
    element.style.height = this.props.collapsedHeight;
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = element => {
    const { transitionDuration, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (transitionDuration === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      element.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof transitionDuration === 'number') {
      element.style.transitionDuration = `${transitionDuration}ms`;
    } else if (transitionDuration) {
      element.style.transitionDuration = `${transitionDuration.enter}ms`;
    } else {
      // The propType will warn in this case.
    }

    element.style.height = `${wrapperHeight}px`;

    if (this.props.onEntering) {
      this.props.onEntering(element);
    }
  };

  handleEntered = element => {
    element.style.transitionDuration = '0ms'; // safari fix
    element.style.height = 'auto';
    reflow(element);
    if (this.props.onEntered) {
      this.props.onEntered(element);
    }
  };

  handleExit = element => {
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
    element.style.height = `${wrapperHeight}px`;
    if (this.props.onExit) {
      this.props.onExit(element);
    }
  };

  handleExiting = element => {
    const { transitionDuration, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (transitionDuration) {
      if (transitionDuration === 'auto') {
        const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
        element.style.transitionDuration = `${duration2}ms`;
        this.autoTransitionDuration = duration2;
      } else if (typeof transitionDuration === 'number') {
        element.style.transitionDuration = `${transitionDuration}ms`;
      } else if (transitionDuration) {
        element.style.transitionDuration = `${transitionDuration.exit}ms`;
      } else {
        // The propType will warn in this case.
      }
    }

    element.style.height = this.props.collapsedHeight;
    if (this.props.onExiting) {
      this.props.onExiting(element);
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
      classes,
      collapsedHeight,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      transitionDuration,
      theme,
      ...other
    } = this.props;

    return (
      <Transition
        onEntering={this.handleEntering}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        enteredClassName={classes.entered}
        onExiting={this.handleExiting}
        onExit={this.handleExit}
        onRequestTimeout={this.handleRequestTimeout}
        style={{
          // For supporting server side rendering.
          minHeight: this.props.collapsedHeight,
        }}
        {...other}
      >
        <div className={classes.container}>
          <div
            ref={node => {
              this.wrapper = node;
            }}
          >
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiCollapse',
})(Collapse);
