import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

// A helper function that calls back when any pending animations have started
const requestAnimationStart = (cb) => {
  // Feature detect rAF, fallback to setTimeout
  if (requestAnimationFrame) {
    // Chrome and Safari have a bug where calling rAF once returns the current
    // frame instead of the next frame, so we need to call a double rAF here.
    // See crbug.com/675795 for more.
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  } else {
    setTimeout(this.props.onRippleStart, 50);
  }
};

class CircleRipple extends Component {
  static propTypes = {
    aborted: PropTypes.bool,
    color: PropTypes.string,
    onRippleStart: PropTypes.func,
    opacity: PropTypes.number,
    style: PropTypes.object,
    touchGenerated: PropTypes.bool,
  };

  static defaultProps = {
    opacity: 0.1,
    aborted: false,
    onRippleStart: () => {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.initializeAnimation(callback);
  }

  componentWillEnter(callback) {
    this.initializeAnimation(callback);
  }

  componentDidAppear() {
    this.animate();
  }

  componentDidEnter() {
    this.animate();
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    // If the animation is aborted, remove from the DOM immediately
    const removeAfter = this.props.aborted ? 0 : 2000;
    this.enterTimer = setTimeout(callback, removeAfter);
  }

  animate() {
    const style = ReactDOM.findDOMNode(this).style;
    const transitionValue = `${transitions.easeOut('2s', 'opacity')}, ${
      transitions.easeOut('1s', 'transform')}`;
    // Once set, the animation starts on the next frame. Components that want to
    // trigger a ripple and simultaneously start thread blocking code should
    // listen for onRippleStart as a queue to do so.
    autoPrefix.set(style, 'transition', transitionValue);
    autoPrefix.set(style, 'transform', 'scale(1)');
    requestAnimationStart(this.props.onRippleStart);
  }

  initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    autoPrefix.set(style, 'transform', 'scale(0)');
    this.leaveTimer = setTimeout(callback, 0);
  }

  render() {
    const {
      aborted, // eslint-disable-line no-unused-vars
      color,
      opacity, // eslint-disable-line no-unused-vars
      style,
      touchGenerated, // eslint-disable-line no-unused-vars
      onRippleStart, // eslint-disable-line no-unused-vars,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedStyles = Object.assign({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedStyles)} />
    );
  }
}

export default CircleRipple;
