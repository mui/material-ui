import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
import AutoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import Colors from '../styles/colors';

const CircleRipple = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
      opacity: 0.16,
    };
  },

  componentWillAppear(callback) {
    this._initializeAnimation(callback);
  },

  componentWillEnter(callback) {
    this._initializeAnimation(callback);
  },

  componentDidAppear() {
    this._animate();
  },

  componentDidEnter() {
    this._animate();
  },

  componentWillLeave(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 2000);
  },

  _animate() {
    let style = ReactDOM.findDOMNode(this).style;
    const transitionValue = (
      Transitions.easeOut('2s', 'opacity') + ',' +
      Transitions.easeOut('1s', 'transform')
    );
    AutoPrefix.set(style, 'transition', transitionValue);
    AutoPrefix.set(style, 'transform', 'scale(1)');
  },

  _initializeAnimation(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    AutoPrefix.set(style, 'transform', 'scale(0)');
    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 0);
  },

  render() {
    const {
      color,
      opacity,
      style,
      ...other,
    } = this.props;

    const mergedStyles = this.mergeAndPrefix({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={mergedStyles} />
    );
  },
});

export default CircleRipple;
