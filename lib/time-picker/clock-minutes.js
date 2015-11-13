'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('../mixins/style-propable');
var ClockNumber = require("./clock-number");
var ClockPointer = require("./clock-pointer");
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

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

var ClockMinutes = React.createClass({
  displayName: 'ClockMinutes',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    initialMinutes: React.PropTypes.number,
    onChange: React.PropTypes.func
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  center: { x: 0, y: 0 },
  basePoint: { x: 0, y: 0 },

  isMousePressed: function isMousePressed(e) {

    if (typeof e.buttons === "undefined") {
      return e.nativeEvent.which;
    }
    return e.buttons;
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialMinutes: new Date().getMinutes(),
      onChange: function onChange() {}
    };
  },

  componentDidMount: function componentDidMount() {
    var clockElement = ReactDOM.findDOMNode(this.refs.mask);

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

  handleTouch: function handleTouch(e) {
    e.preventDefault();
    this.setClock(e.changedTouches[0], false);
  },

  setClock: function setClock(e, finish) {
    if (typeof e.offsetX === 'undefined') {
      var offset = getTouchEventOffsetValues(e);

      e.offsetX = offset.offsetX;
      e.offsetY = offset.offsetY;
    }

    var minutes = this.getMinutes(e.offsetX, e.offsetY);

    this.props.onChange(minutes, finish);
  },

  getMinutes: function getMinutes(offsetX, offsetY) {
    var step = 6;
    var x = offsetX - this.center.x;
    var y = offsetY - this.center.y;
    var cx = this.basePoint.x - this.center.x;
    var cy = this.basePoint.y - this.center.y;

    var atan = Math.atan2(cx, cy) - Math.atan2(x, y);

    var deg = rad2deg(atan);
    deg = Math.round(deg / step) * step;
    deg %= 360;

    var value = Math.floor(deg / step) || 0;

    return value;
  },

  _getMinuteNumbers: function _getMinuteNumbers() {
    var minutes = [];
    for (var i = 0; i < 12; i++) {
      minutes.push(i * 5);
    }
    var selectedMinutes = this.props.initialMinutes;
    var hasSelected = false;

    var numbers = minutes.map(function (minute) {
      var isSelected = selectedMinutes === minute;
      if (isSelected) hasSelected = true;
      return React.createElement(ClockNumber, { key: minute, isSelected: isSelected, type: 'minute', value: minute });
    });

    return {
      numbers: numbers,
      hasSelected: hasSelected,
      selected: selectedMinutes
    };
  },

  render: function render() {
    var styles = {
      root: {
        height: "100%",
        width: "100%",
        borderRadius: "100%",
        position: "relative",
        pointerEvents: "none",
        boxSizing: "border-box"
      },

      hitMask: {
        height: "100%",
        width: "100%",
        pointerEvents: "auto"
      }
    };

    var minutes = this._getMinuteNumbers();

    return React.createElement(
      'div',
      { ref: 'clock', style: this.prepareStyles(styles.root) },
      React.createElement(ClockPointer, { value: minutes.selected, type: 'minute' }),
      minutes.numbers,
      React.createElement('div', { ref: 'mask', style: this.prepareStyles(styles.hitMask), hasSelected: minutes.hasSelected,
        onTouchMove: this.handleTouch, onTouchEnd: this.handleTouch,
        onMouseUp: this.handleUp, onMouseMove: this.handleMove })
    );
  }
});

module.exports = ClockMinutes;