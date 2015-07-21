'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Dom = require('../utils/dom');
var RippleCircle = require('./circle-ripple');

var TouchRipple = React.createClass({
  displayName: 'TouchRipple',

  mixins: [StylePropable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      ripples: [{
        key: 0,
        started: false,
        ending: false
      }]
    };
  },

  render: function render() {
    var styles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden'
    }, this.props.style);

    return React.createElement(
      'div',
      {
        onMouseUp: this._handleMouseUp,
        onMouseDown: this._handleMouseDown,
        onMouseLeave: this._handleMouseLeave,
        onTouchStart: this._handleTouchStart,
        onTouchEnd: this._handleTouchEnd },
      React.createElement(
        'div',
        { style: styles },
        this._getRippleElements()
      ),
      this.props.children
    );
  },

  start: function start(e, isRippleTouchGenerated) {
    var ripples = this.state.ripples;
    var nextKey = ripples[ripples.length - 1].key + 1;
    var style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    var ripple = undefined;

    //Do nothing if we're starting a click-event-generated ripple
    //while having touch-generated ripples
    if (!isRippleTouchGenerated) {
      for (var i = 0; i < ripples.length; i++) {
        if (ripples[i].touchGenerated) return;
      }
    }

    //Start the next unstarted ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.touchGenerated = isRippleTouchGenerated;
        ripple.style = style;
        break;
      }
    }

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false
    });

    //Re-render
    this.setState({
      ripples: ripples
    });
  },

  end: function end() {
    var _this = this;

    var ripples = this.state.ripples;
    var ripple = undefined;
    var endingRipple = undefined;

    //End the the next un-ended ripple
    for (var i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    }

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(function () {
        ripples.shift();
        if (_this.isMounted()) {
          _this.setState({
            ripples: ripples
          });
        }
      }, 2000);
    }
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
    var el = React.findDOMNode(this);
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
  },

  _getRippleElements: function _getRippleElements() {
    var _this2 = this;

    return this.state.ripples.map(function (ripple) {
      return React.createElement(RippleCircle, {
        key: ripple.key,
        started: ripple.started,
        ending: ripple.ending,
        style: ripple.style,
        color: _this2.props.color,
        opacity: _this2.props.opacity });
    });
  }

});

module.exports = TouchRipple;