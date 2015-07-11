'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var ClockNumber = require('./clock-number');
var ClockPointer = require('./clock-pointer');

function rad2deg(rad) {
  return rad * 57.29577951308232;
}

function getTouchEventOffsetValues(e) {
  var el = e.target;
  var boundingRect = el.getBoundingClientRect();

  var offset = {
    offsetX: e.clientX - boundingRect.left,
    offsetY: e.clientY - boundingRect.top
  };

  return offset;
}

var ClockHours = React.createClass({
  displayName: 'ClockHours',

  mixins: [StylePropable],

  propTypes: {
    initialHours: React.PropTypes.number,
    onChange: React.PropTypes.func,
    format: React.PropTypes.oneOf(['ampm', '24hr'])
  },

  center: { x: 0, y: 0 },
  basePoint: { x: 0, y: 0 },

  isMousePressed: function isMousePressed(e) {
    if (typeof e.buttons === 'undefined') {
      return e.nativeEvent.which;
    }

    return e.buttons;
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialHours: new Date().getHours(),
      onChange: function onChange() {},
      format: 'ampm'
    };
  },

  componentDidMount: function componentDidMount() {
    var clockElement = React.findDOMNode(this.refs.mask);

    this.center = {
      x: clockElement.offsetWidth / 2,
      y: clockElement.offsetHeight / 2
    };

    this.basePoint = {
      x: this.center.x,
      y: 0
    };
  },

  handleUp: function handleUp(e) {
    e.preventDefault();
    this.setClock(e.nativeEvent, true);
  },

  handleMove: function handleMove(e) {
    e.preventDefault();
    if (this.isMousePressed(e) !== 1) return;
    this.setClock(e.nativeEvent, false);
  },

  handleTouchMove: function handleTouchMove(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], false);
  },

  handleTouchEnd: function handleTouchEnd(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], true);
  },

  setClock: function setClock(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      var offset = getTouchEventOffsetValues(e);

      e.offsetX = offset.offsetX;
      e.offsetY = offset.offsetY;
    }

    var hours = this.getHours(e.offsetX, e.offsetY);

    this.props.onChange(hours, finish);
  },

  getHours: function getHours(offsetX, offsetY) {
    var step = 30;
    var x = offsetX - this.center.x;
    var y = offsetY - this.center.y;
    var cx = this.basePoint.x - this.center.x;
    var cy = this.basePoint.y - this.center.y;

    var atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    var deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;

    var value = Math.floor(deg / step) || 0;

    var delta = Math.pow(x, 2) + Math.pow(y, 2);
    var distance = Math.sqrt(delta);

    value = value || 12;
    if (this.props.format === '24hr') {
      if (distance < 90) {
        value += 12;
        value %= 24;
      }
    } else {
      value %= 12;
    }

    return value;
  },

  _getSelected: function _getSelected() {
    var hour = this.props.initialHours;

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    return hour;
  },

  _getHourNumbers: function _getHourNumbers() {
    var _this = this;

    var style = {
      pointerEvents: 'none'
    };
    var hourSize = this.props.format === 'ampm' ? 12 : 24;

    var hours = [];
    for (var i = 1; i <= hourSize; i++) {
      hours.push(i % 24);
    }

    return hours.map(function (hour) {
      var isSelected = _this._getSelected() === hour;
      return React.createElement(ClockNumber, { key: hour, style: style, isSelected: isSelected, type: 'hour', value: hour });
    });
  },

  render: function render() {
    var styles = {
      root: {
        height: '100%',
        width: '100%',
        borderRadius: '100%',
        position: 'relative',
        pointerEvents: 'none',
        boxSizing: 'border-box'
      },

      hitMask: {
        height: '100%',
        width: '100%',
        pointerEvents: 'auto'
      }
    };

    var hours = this._getSelected();
    var numbers = this._getHourNumbers();

    return React.createElement(
      'div',
      { ref: 'clock', style: this.mergeAndPrefix(styles.root) },
      React.createElement(ClockPointer, { hasSelected: true, value: hours, type: 'hour' }),
      numbers,
      React.createElement('div', { ref: 'mask', style: this.mergeAndPrefix(styles.hitMask), onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd, onMouseUp: this.handleUp, onMouseMove: this.handleMove })
    );
  }
});

module.exports = ClockHours;