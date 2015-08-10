'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var SlideInChild = require('./slide-in-child');

var SlideIn = React.createClass({
  displayName: 'SlideIn',

  mixins: [StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    childStyle: React.PropTypes.object,
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0,
      direction: 'left'
    };
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var enterDelay = _props.enterDelay;
    var children = _props.children;
    var childStyle = _props.childStyle;
    var direction = _props.direction;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['enterDelay', 'children', 'childStyle', 'direction', 'style']);

    var mergedRootStyles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, style);

    var newChildren = React.Children.map(children, function (child) {
      return React.createElement(
        SlideInChild,
        {
          key: child.key,
          direction: direction,
          enterDelay: enterDelay,
          getLeaveDirection: _this._getLeaveDirection,
          style: childStyle },
        child
      );
    }, this);

    return React.createElement(
      ReactTransitionGroup,
      _extends({}, other, {
        style: mergedRootStyles,
        component: 'div' }),
      newChildren
    );
  },

  _getLeaveDirection: function _getLeaveDirection() {
    return this.props.direction;
  }

});

module.exports = SlideIn;