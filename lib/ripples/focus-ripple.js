'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Colors = require('../styles/colors');
var Transitions = require('../styles/transitions');
var ScaleInTransitionGroup = require('../transition-groups/scale-in');

var pulsateDuration = 750;

var FocusRipple = React.createClass({
  displayName: 'FocusRipple',

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    color: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    opacity: React.PropTypes.number,
    show: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      color: Colors.darkBlack
    };
  },

  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.show) {
      this._setRippleSize();
      this._pulsate();
    } else {
      if (this._timeout) clearTimeout(this._timeout);
    }
  },

  render: function render() {
    var _props = this.props;
    var show = _props.show;
    var style = _props.style;

    var mergedRootStyles = this.mergeStyles({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    }, style);

    var ripple = show ? this._getRippleElement(this.props) : null;

    return React.createElement(
      ScaleInTransitionGroup,
      {
        maxScale: 0.85,
        style: mergedRootStyles },
      ripple
    );
  },

  _getRippleElement: function _getRippleElement(props) {
    var color = props.color;
    var innerStyle = props.innerStyle;
    var opacity = props.opacity;

    var innerStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      opacity: opacity ? opacity : 0.16,
      backgroundColor: color,
      transition: Transitions.easeOut(pulsateDuration + 'ms', 'transform', null, Transitions.easeInOutFunction)
    }, innerStyle);

    return React.createElement('div', { ref: 'innerCircle', style: innerStyles });
  },

  _pulsate: function _pulsate() {
    if (!this.isMounted()) return;

    var innerCircle = ReactDOM.findDOMNode(this.refs.innerCircle);
    if (!innerCircle) return;

    var startScale = 'scale(1)';
    var endScale = 'scale(0.85)';
    var currentScale = innerCircle.style.transform;
    var nextScale = undefined;

    currentScale = currentScale || startScale;
    nextScale = currentScale === startScale ? endScale : startScale;

    AutoPrefix.set(innerCircle.style, 'transform', nextScale);
    this._timeout = setTimeout(this._pulsate, pulsateDuration);
  },

  _setRippleSize: function _setRippleSize() {
    var el = ReactDOM.findDOMNode(this.refs.innerCircle);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    var oldTop = 0;
    // For browsers that don't support endsWith()
    if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
      oldTop = parseInt(el.style.top);
    }
    el.style.height = size + 'px';
    el.style.top = height / 2 - size / 2 + oldTop + 'px';
  }

});

module.exports = FocusRipple;