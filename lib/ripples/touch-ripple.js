'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ReactTransitionGroup = require('react-addons-transition-group');
var StylePropable = require('../mixins/style-propable');
var Dom = require('../utils/dom');
var ImmutabilityHelper = require('../utils/immutability-helper');
var CircleRipple = require('./circle-ripple');

var TouchRipple = React.createClass({
  displayName: 'TouchRipple',

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
    style: React.PropTypes.object
  },

  getInitialState: function getInitialState() {
    return {
      //This prop allows us to only render the ReactTransitionGroup
      //on the first click of the component, making the inital
      //render faster
      hasRipples: false,
      nextKey: 0,
      ripples: []
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var style = _props.style;
    var _state = this.state;
    var hasRipples = _state.hasRipples;
    var ripples = _state.ripples;

    var rippleGroup = undefined;
    if (hasRipples) {
      var mergedStyles = this.mergeAndPrefix({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden'
      }, style);

      rippleGroup = React.createElement(
        ReactTransitionGroup,
        { style: mergedStyles },
        ripples
      );
    }

    return React.createElement(
      'div',
      {
        onMouseUp: this._handleMouseUp,
        onMouseDown: this._handleMouseDown,
        onMouseLeave: this._handleMouseLeave,
        onTouchStart: this._handleTouchStart,
        onTouchEnd: this._handleTouchEnd },
      rippleGroup,
      children
    );
  },

  start: function start(e, isRippleTouchGenerated) {
    var ripples = this.state.ripples;

    //Do nothing if we're starting a click-event-generated ripple
    //while having touch-generated ripples
    if (!isRippleTouchGenerated) {
      for (var i = 0; i < ripples.length; i++) {
        if (ripples[i].props.touchGenerated) return;
      }
    }

    //Add a ripple to the ripples array
    ripples = ImmutabilityHelper.push(ripples, React.createElement(CircleRipple, {
      key: this.state.nextKey,
      style: !this.props.centerRipple ? this._getRippleStyle(e) : {},
      color: this.props.color,
      opacity: this.props.opacity,
      touchGenerated: isRippleTouchGenerated }));

    this.setState({
      hasRipples: true,
      nextKey: this.state.nextKey + 1,
      ripples: ripples
    });
  },

  end: function end() {
    var currentRipples = this.state.ripples;
    this.setState({
      ripples: ImmutabilityHelper.shift(currentRipples)
    });
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) this.start(e, false);
  },

  _handleMouseUp: function _handleMouseUp() {
    this.end();
  },

  _handleMouseLeave: function _handleMouseLeave() {
    this.end();
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.start(e, true);
  },

  _handleTouchEnd: function _handleTouchEnd() {
    this.end();
  },

  _getRippleStyle: function _getRippleStyle(e) {
    var style = {};
    var el = ReactDOM.findDOMNode(this);
    var elHeight = el.offsetHeight;
    var elWidth = el.offsetWidth;
    var offset = Dom.offset(el);
    var isTouchEvent = e.touches && e.touches.length;
    var pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
    var pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
    var pointerX = pageX - offset.left;
    var pointerY = pageY - offset.top;
    var topLeftDiag = this._calcDiag(pointerX, pointerY);
    var topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    var botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    var botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
    var rippleSize = rippleRadius * 2;
    var left = pointerX - rippleRadius;
    var top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  },

  _calcDiag: function _calcDiag(a, b) {
    return Math.sqrt(a * a + b * b);
  }

});

module.exports = TouchRipple;