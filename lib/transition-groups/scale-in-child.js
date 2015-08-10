'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');

var ScaleInChild = React.createClass({
  displayName: 'ScaleInChild',

  mixins: [StylePropable],

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

  componentWillEnter: function componentWillEnter(callback) {
    var style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(0)');

    setTimeout(callback, this.props.enterDelay);
  },

  componentDidEnter: function componentDidEnter() {
    var style = React.findDOMNode(this).style;

    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
  },

  componentWillLeave: function componentWillLeave(callback) {
    var style = React.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')');

    setTimeout(callback, 450);
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
  }

});

module.exports = ScaleInChild;