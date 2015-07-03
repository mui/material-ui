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
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'left'
    };
  },

  render: function render() {
    var _props = this.props;
    var direction = _props.direction;

    var other = _objectWithoutProperties(_props, ['direction']);

    var styles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, this.props.style);

    return React.createElement(
      ReactTransitionGroup,
      _extends({}, other, {
        style: styles,
        component: 'div' }),
      this._getSlideInChildren()
    );
  },

  _getSlideInChildren: function _getSlideInChildren() {
    var _this = this;

    return React.Children.map(this.props.children, function (child) {
      return React.createElement(
        SlideInChild,
        {
          key: child.key,
          direction: _this.props.direction,
          getLeaveDirection: _this._getLeaveDirection },
        child
      );
    }, this);
  },

  _getLeaveDirection: function _getLeaveDirection() {
    return this.props.direction;
  }

});

module.exports = SlideIn;