// @flow weak

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';
import { easing } from '../styles/transitions';

const reflow = (elem) => elem && elem.offsetHeight;

export const styleSheet = createStyleSheet('Ripple', (theme) => ({
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
  animating: {
    transition: theme.transitions.multi(['transform', 'opacity'], '550ms'),
    '&fast': {
      transitionDuration: '200ms',
    },
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
  visible: {
    opacity: 0.3,
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
}));

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
    rippleStart: false,
    rippleVisible: false,
  };

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  componentDidEnter() {
    this.start();
  }

  componentWillLeave(callback) {
    this.stop();
    this.leaveTimer = setTimeout(() => {
      callback();
    }, 550);
  }

  ripple = null;
  leaveTimer = undefined;

  start = (cb) => {
    this.setState({
      rippleVisible: true,
      rippleStart: true,
    }, () => {
      if (cb) {
        cb();
      }
      reflow(findDOMNode(this.ripple));
      this.setState({ rippleStart: false });
    });
  };

  stop = () => {
    this.setState({
      rippleVisible: false,
    });
  };

  getRippleStyles() {
    const { rippleStart } = this.state;
    const { rippleSize, rippleX, rippleY } = this.props;

    const scale = rippleStart ? 'scale(0.00001, 0.00001)' : 'scale(1, 1)';
    const offset = `translate(${rippleX}px, ${rippleY}px)`;
    const transformString = `translate(-50%, -50%) ${offset} ${scale}`;

    const rippleStyles = {
      width: `${rippleSize}px`,
      height: `${rippleSize}px`,
      transform: transformString,
    };

    return rippleStyles;
  }

  render() {
    const { className, pulsate } = this.props;
    const { rippleStart, rippleVisible } = this.state;
    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    const rippleClassName = classNames(classes.ripple, {
      [classes.visible]: rippleVisible,
      [classes.animating]: !rippleStart,
      [classes.fast]: pulsate,
    }, className);

    const rippleStyles = this.getRippleStyles();

    const ripple = <span ref={(c) => this.ripple = c} className={rippleClassName} style={rippleStyles}></span>;

    if (pulsate) {
      return <span className={classes.pulsating}>{ripple}</span>;
    }

    return ripple;
  }
}
