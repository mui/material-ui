// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import Transition from '../internal/Transition';

const reflow = elem => elem.offsetHeight;

export const styleSheet = createStyleSheet('MuiCollapse', theme => ({
  container: {
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
  },
  entered: {
    height: 'auto',
    transitionDuration: '0ms',
  },
}));

class Collapse extends Component {
  static defaultProps = {
    in: false,
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

Collapse.propTypes = {
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * Callback fired before the component is entering.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the component is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired when the component has entered.
   */
  onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the component is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired when the component has exited.
   */
  onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Collapse.defaultProps = {
  in: false,
  transitionDuration: 300,
};

export default withStyles(styleSheet, {
  withTheme: true,
})(Collapse);
