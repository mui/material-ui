import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

const animationKeyframesAlreadySetUp = {};

class CircleRipple extends React.Component {
  static propTypes = {
    aborted: React.PropTypes.bool,
    color: React.PropTypes.string,
    onRippleStart: React.PropTypes.func,
    opacity: React.PropTypes.number,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    opacity: 0.1,
    aborted: false,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
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
    // These animations are driven with CSS animations because CSS transitions
    // don't provide a start even
    const node = ReactDOM.findDOMNode(this);
    // TODO: Support prefixing for reals (I'll do this before landing the change)
    node.addEventListener('webkitAnimationStart', this.props.onRippleStart);
    // Register the animation for a ripple of this opacity in the style sheets
    this.setUpAnimationKeyframes(this.props.opacity);
    node.style.animation = `rippleAnimation 2s ${ transitions.easeOutFunction }`;
  }

  initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    autoPrefix.set(style, 'transform', 'scale(0)');
    this.leaveTimer = setTimeout(callback, 0);
  }

  setUpAnimationKeyframes(opacity) {
    // Only register keyframes for each opacity once to avoid potential memory
    // issues
    if (animationKeyframesAlreadySetUp[opacity]) {
      return;
    }
    // Create the CSS animation
    const animation = `@keyframes rippleAnimation {
      0% {
        transform: scale(0);
        opacity: ${ opacity };
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }`;
    // Add it to the document stylesheet
    document.styleSheets[0].insertRule(animation, document.styleSheets[0].rules.length);
    animationKeyframesAlreadySetUp[opacity] = true;
  }

  render() {
    const {
      color,
      opacity, // eslint-disable-line no-unused-vars
      style,
      ...other,
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
