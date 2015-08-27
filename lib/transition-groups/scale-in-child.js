'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');

var ScaleInChild = React.createClass({
  displayName: 'ScaleInChild',

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0,
      maxScale: 1,
      minScale: 0
    };
  },

  componentWillAppear: function componentWillAppear(callback) {
    this._initializeAnimation(callback);
  },

  componentWillEnter: function componentWillEnter(callback) {
    this._initializeAnimation(callback);
  },

  componentDidAppear: function componentDidAppear() {
    this._animate();
  },

  componentDidEnter: function componentDidEnter() {
    this._animate();
  },

  componentWillLeave: function componentWillLeave(callback) {
    var _this = this;

    var style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')');

    setTimeout((function () {
      if (_this.isMounted()) callback();
    }).bind(this), 450);
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var enterDelay = _props.enterDelay;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'style']);

    var mergedRootStyles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity'])
    }, style);

    return React.createElement(
      'div',
      _extends({}, other, { style: mergedRootStyles }),
      children
    );
  },

  _animate: function _animate() {
    var style = React.findDOMNode(this).style;

    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
  },

  _initializeAnimation: function _initializeAnimation(callback) {
    var _this2 = this;

    var style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(0)');

    setTimeout((function () {
      if (_this2.isMounted()) callback();
    }).bind(this), this.props.enterDelay);
  }

});

module.exports = ScaleInChild;