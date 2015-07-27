'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');

var SlideInChild = React.createClass({
  displayName: 'SlideInChild',

  mixins: [StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    //This callback is needed bacause the direction could change
    //when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0
    };
  },

  componentWillEnter: function componentWillEnter(callback) {
    var style = React.findDOMNode(this).style;
    var x = this.props.direction === 'left' ? '100%' : this.props.direction === 'right' ? '-100%' : '0';
    var y = this.props.direction === 'up' ? '100%' : this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, this.props.enterDelay);
  },

  componentDidEnter: function componentDidEnter() {
    var style = React.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave: function componentWillLeave(callback) {
    var style = React.findDOMNode(this).style;
    var direction = this.props.getLeaveDirection();
    var x = direction === 'left' ? '-100%' : direction === 'right' ? '100%' : '0';
    var y = direction === 'up' ? '-100%' : direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 450);
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var enterDelay = _props.enterDelay;
    var getLeaveDirection = _props.getLeaveDirection;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'getLeaveDirection', 'style']);

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

module.exports = SlideInChild;