// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import { easing } from '../styles/transitions';

export const styleSheet = createStyleSheet('Ripple', () => ({
  ripple: {
    width: 50,
    height: 50,
    left: 0,
    top: 0,
    opacity: 0,
    position: 'absolute',
    borderRadius: '50%',
    background: 'currentColor',
  },
  visible: {
    opacity: 0.3,
    transform: 'scale(1, 1)',
    animation: `ripple-enter 550ms ${easing.easeInOut}`,
    '&fast': {
      animationDuration: '200ms',
    },
  },
  leaving: {
    opacity: 0,
    animation: `ripple-exit 550ms ${easing.easeInOut}`,
  },
  pulsating: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'block',
    width: '100%',
    height: '100%',
    animation: `ripple-pulsate 1500ms ${easing.easeInOut} 200ms infinite`,
    visible: {
      opacity: 0.2,
    },
  },
  '@keyframes ripple-enter': {
    '0%': {
      transform: 'scale(0.00001, 0.00001)',
    },
    '100%': {
      transform: 'scale(1, 1)',
    },
  },
  '@keyframes ripple-exit': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  '@keyframes ripple-pulsate': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(0.9)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}), { index: 1 });

export default class Ripple extends Component {
  static propTypes = {
    className: PropTypes.string,
    pulsate: PropTypes.bool,
    rippleSize: PropTypes.number,
    rippleX: PropTypes.number,
    rippleY: PropTypes.number,
  };

  static defaultProps = {
    pulsate: false,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    rippleVisible: false,
  };

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  componentWillEnter(callback) {
    this.start(callback);
  }

  componentWillLeave(callback) {
    this.stop();
    this.leaveTimer = setTimeout(() => {
      callback();
    }, 550);
  }

  ripple = null;
  leaveTimer = undefined;

  start = (callback) => {
    this.setState({
      rippleVisible: true,
    }, callback);
  };

  stop = () => {
    this.setState({
      rippleLeaving: true,
    });
  };

  getRippleStyles() {
    const { rippleSize, rippleX, rippleY } = this.props;

    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };

    return rippleStyles;
  }

  render() {
    const { className, pulsate } = this.props;
    const { rippleVisible, rippleLeaving } = this.state;
    const classes = this.context.styleManager.render(styleSheet);

    const rippleClassName = classNames(classes.ripple, {
      [classes.visible]: rippleVisible,
      [classes.fast]: pulsate,
    }, className);

    const containerClasses = classNames({
      [classes.leaving]: rippleLeaving,
      [classes.pulsating]: pulsate,
    });

    const rippleStyles = this.getRippleStyles();

    return (
      <span className={containerClasses}>
        <span ref={(c) => this.ripple = c} className={rippleClassName} style={rippleStyles} />
      </span>
    );
  }
}
