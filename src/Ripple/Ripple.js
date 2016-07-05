// @flow
import React, {Component, PropTypes, Element} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import requestAnimFrame from 'dom-helpers/util/requestAnimationFrame';
import {easing} from '../styles/transitions';

// const reflow = (elem) => elem.offsetHeight;

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

declare function LeaveTimer(fn:Object, delay:number):void;

type DefaultProps = {
  pulsate: boolean,
}

type Props = {
  className?: string,
  pulsate: boolean,
  rippleSize?: number,
  rippleX?: number,
  rippleY?: number,
};

type State = {
  rippleStart: boolean,
  rippleVisible: boolean,
}

export default class Ripple extends Component<DefaultProps, Props, State> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    puslate: false,
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

  componentWillLeave(callback: Callback) {
      // reflow(ReactDOM.findDOMNode(this.ripple));
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
      requestAnimFrame(() => {
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

  render(): Element<any> {
    const {className, pulsate} = this.props;
    const {rippleStart, rippleVisible} = this.state;
    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const rippleClassName = ClassNames(classes.ripple, {
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
