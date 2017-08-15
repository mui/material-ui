// @flow

import React, { PureComponent } from 'react';
import type { Element } from 'react';
import withStyles from '../styles/withStyles';
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

type DefaultProps = {
  classes: Object,
  in: boolean,
  theme: Object,
  transitionDuration: number,
};

export type Props = {
  /**
   * The content node to be collapsed.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
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
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
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
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * @ignore
   */
  theme?: Object,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration?: number | string,
};

type AllProps = DefaultProps & Props;

class Collapse extends PureComponent<DefaultProps, AllProps, void> {
  props: AllProps;

  static defaultProps: DefaultProps = {
    classes: {},
    in: false,
    theme: {},
    transitionDuration: 300,
  };

  wrapper = null;

  handleEnter = element => {
    element.style.height = '0px';
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }
  };

  handleEntering = element => {
    const { transitionDuration, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (transitionDuration === 'auto') {
      const { getAutoHeightDuration } = theme.transitions;
      element.style.transitionDuration = `${getAutoHeightDuration(wrapperHeight)}ms`;
    } else if (typeof transitionDuration === 'number') {
      element.style.transitionDuration = `${transitionDuration}ms`;
    } else {
      element.style.transitionDuration = transitionDuration;
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
        const { getAutoHeightDuration } = theme.transitions;
        element.style.transitionDuration = `${getAutoHeightDuration(wrapperHeight)}ms`;
      } else if (typeof transitionDuration === 'number') {
        element.style.transitionDuration = `${transitionDuration}ms`;
      } else {
        element.style.transitionDuration = transitionDuration;
      }
    }

    element.style.height = '0px';
    if (this.props.onExiting) {
      this.props.onExiting(element);
    }
  };

  render() {
    const {
      children,
      classes,
      onEnter,
      onEntering,
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
