const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const StylePropable = require('../mixins/style-propable');
const AutoPrefix = require('../styles/auto-prefix');
const Transitions = require('../styles/transitions');
const Colors = require('../styles/colors');


const CircleRipple = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    style: React.PropTypes.object,
  },

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

});

module.exports = CircleRipple;
