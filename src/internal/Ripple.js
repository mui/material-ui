// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

export const styleSheet = createStyleSheet('MuiRipple', theme => ({
  root: {
    opacity: 1,
  },
  rootLeaving: {
    opacity: 0,
    animation: `mui-ripple-exit 550ms ${theme.transitions.easing.easeInOut}`,
  },
  rootPulsating: {
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'block',
    width: '100%',
    height: '100%',
    animation: `mui-ripple-pulsate 1500ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
    rippleVisible: {
      opacity: 0.2,
    },
  },
  '@keyframes mui-ripple-enter': {
    '0%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  '@keyframes mui-ripple-exit': {
    '0%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
  '@keyframes mui-ripple-pulsate': {
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
  rippleVisible: {
    opacity: 0.3,
    transform: 'scale(1)',
    animation: `mui-ripple-enter 550ms ${theme.transitions.easing.easeInOut}`,
  },
  rippleFast: {
    animationDuration: '200ms',
  },
}));

/**
 * @ignore - internal component.
 */
class Ripple extends Component {
  static defaultProps = {
    pulsate: false,
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
    this.stop(() => {
      this.leaveTimer = setTimeout(() => {
        callback();
      }, 550);
    });
  }

  ripple = null;
  leaveTimer = null;

  start = callback => {
    this.setState(
      {
        rippleVisible: true,
      },
      callback,
    );
  };

  stop = callback => {
    this.setState(
      {
        rippleLeaving: true,
      },
      callback,
    );
  };

  getRippleStyles() {
    const { rippleSize, rippleX, rippleY } = this.props;

    return {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };
  }

  render() {
    const { className: classNameProp, pulsate } = this.props;
    const { rippleVisible, rippleLeaving } = this.state;
    const classes = this.context.styleManager.render(styleSheet);

    const className = classNames(
      classes.root,
      {
        [classes.rootLeaving]: rippleLeaving,
        [classes.rootPulsating]: pulsate,
      },
      classNameProp,
    );

    const rippleClassName = classNames(classes.ripple, {
      [classes.rippleVisible]: rippleVisible,
      [classes.rippleFast]: pulsate,
    });

    const rippleStyles = this.getRippleStyles();

    return (
      <span className={className}>
        <span className={rippleClassName} style={rippleStyles} />
      </span>
    );
  }
}

Ripple.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number.isRequired,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number.isRequired,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number.isRequired,
};

Ripple.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default Ripple;
