// @flow
import React, {Component, Element} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';

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
    transition: theme.transitions.multi(
      ['transform', 'opacity'],
      '550ms',
    ),
  },
  visible: {
    opacity: 0.3,
  },
}));

declare function LeaveTimer(fn:Object, delay:number):void;

type Props = {
  className?: string,
  rippleSize?: number,
  rippleX?: number,
  rippleY?: number,
};

type State = {
  rippleStart: boolean,
  rippleVisible: boolean,
}

export default class Ripple extends Component<void, Props, State> {
  static contextTypes = {
    styleManager: Object,
  };

  state:State = {
    rippleStart: false,
    rippleVisible: false,
  };

  componentWillUnmount() {
    clearTimeout(this.leaveTimer);
  }

  props:Props;
  leaveTimer:LeaveTimer;

  componentDidEnter() {
    this.start();
  }

  componentWillLeave(callback:Callback) {
    this.stop();
    this.leaveTimer = setTimeout(() => {
      callback();
    }, 550);
  }

  start:Callback = () => {
    this.setState({
      rippleVisible: true,
      rippleStart: true,
    }, () => {
      window.requestAnimationFrame(() => {
        this.setState({rippleStart: false});
      });
    });
  };

  stop:Callback = () => {
    this.setState({
      rippleVisible: false,
    });
  };

  getRippleStyles() {
    const {rippleStart} = this.state;
    const {rippleSize, rippleX, rippleY} = this.props;

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

  render():Element {
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
