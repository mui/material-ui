'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var ScaleInChild = require('./scale-in-child');

var ScaleIn = React.createClass({
  displayName: 'ScaleIn',

  mixins: [StylePropable],

  propTypes: {
    childStyle: React.PropTypes.object,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      enterDelay: 0
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var childStyle = _props.childStyle;
    var enterDelay = _props.enterDelay;
    var maxScale = _props.maxScale;
    var minScale = _props.minScale;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'childStyle', 'enterDelay', 'maxScale', 'minScale', 'style']);

    var mergedRootStyles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, style);

    var newChildren = React.Children.map(children, function (child) {
      return React.createElement(
        ScaleInChild,
        {
          key: child.key,
          enterDelay: enterDelay,
          maxScale: maxScale,
          minScale: minScale,
          style: childStyle },
        child
      );
    });

    return React.createElement(
      ReactTransitionGroup,
      _extends({}, other, {
        style: mergedRootStyles,
        component: 'div' }),
      newChildren
    );
  }

});

module.exports = ScaleIn;