import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

export function createRippleHandler(instance, eventName, action) {
  return function handleEvent(event) {
    if (instance.ripple) {
      instance.ripple[action](event);
    }
    if (instance.props && typeof instance.props[`handle${eventName}`] === 'function') {
      instance.props[`on${eventName}`](event);
    }
  };
}

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
    pointerEvents: 'none',
  },
  animating: {
    transition: theme.transitions.multi(
      ['transform', 'opacity'],
      '550ms',
    ),
  },
  visible: {
    opacity: 0.3,
  },
}));

export default class Ripple extends Component {
  static propTypes = {
    className: PropTypes.string,
    rippleSize: PropTypes.number,
    rippleX: PropTypes.number,
    rippleY: PropTypes.number,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    rippleStart: false,
    rippleVisible: false,
  };

  componentWillEnter(callback) {
    // console.log('componentWillEnter');
    callback();
    this.start();
  }

  componentWillLeave(callback) {
    // console.log('componentWillLeave');
    this.stop();
    this.leaveTimer = setTimeout(() => {
      // console.log('leaving');
      callback();
    }, 550);
  }

  start = () => {
    this.setState({
      rippleVisible: true,
      rippleStart: true,
    }, () => {
      window.requestAnimationFrame(() => {
        this.setState({rippleStart: false});
      });
    });
  };

  stop = () => {
    this.setState({
      rippleVisible: false,
    });
  };

  getRippleStyles() {
    const {rippleStart} = this.state;
    const {rippleSize, rippleX, rippleY} = this.props;

    const scale = rippleStart ? 'scale(0, 0)' : 'scale(1, 1)';
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
    const {className} = this.props;
    const {rippleStart, rippleVisible} = this.state;
    const classes = this.context.styleManager.render(styleSheet);

    const rippleClassName = ClassNames(classes.ripple, {
      [classes.visible]: rippleVisible,
      [classes.animating]: !rippleStart,
    }, className);

    return <span className={rippleClassName} style={this.getRippleStyles()}></span>;
  }
}
