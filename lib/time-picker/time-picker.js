'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var TimePickerDialog = require('./time-picker-dialog');
var TextField = require('../text-field');

var emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);

var TimePicker = React.createClass({
  displayName: 'TimePicker',

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    defaultTime: React.PropTypes.object,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    pedantic: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultTime: null,
      format: 'ampm',
      pedantic: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      time: this.props.defaultTime || emptyTime,
      dialogTime: new Date()
    };
  },

  formatTime: function formatTime(date) {
    var hours = date.getHours();
    var mins = date.getMinutes().toString();

    if (this.props.format === "ampm") {
      var isAM = hours < 12;
      hours = hours % 12;
      var additional = isAM ? " am" : " pm";
      hours = (hours || 12).toString();

      if (mins.length < 2) mins = "0" + mins;

      if (this.props.pedantic) {
        // Treat midday/midnight specially http://www.nist.gov/pml/div688/times.cfm
        if (hours === "12" && mins === "00") {
          return additional === " pm" ? "12 noon" : "12 midnight";
        }
      }

      return hours + (mins === "00" ? "" : ":" + mins) + additional;
    }

    hours = hours.toString();

    if (hours.length < 2) hours = "0" + hours;
    if (mins.length < 2) mins = "0" + mins;

    return hours + ":" + mins;
  },

  render: function render() {
    var _props = this.props;
    var format = _props.format;
    var onFocus = _props.onFocus;
    var onTouchTap = _props.onTouchTap;
    var onShow = _props.onShow;
    var onDismiss = _props.onDismiss;

    var other = _objectWithoutProperties(_props, ['format', 'onFocus', 'onTouchTap', 'onShow', 'onDismiss']);

    var defaultInputValue = undefined;

    if (this.props.defaultTime) {
      defaultInputValue = this.formatTime(this.props.defaultTime);
    }

    return React.createElement(
      'div',
      null,
      React.createElement(TextField, _extends({}, other, {
        ref: 'input',
        defaultValue: defaultInputValue,
        onFocus: this._handleInputFocus,
        onTouchTap: this._handleInputTouchTap })),
      React.createElement(TimePickerDialog, {
        ref: 'dialogWindow',
        initialTime: this.state.dialogTime,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: onDismiss,
        format: format })
    );
  },

  getTime: function getTime() {
    return this.state.time;
  },

  setTime: function setTime(t) {
    this.setState({
      time: t
    });
    this.refs.input.setValue(this.formatTime(t));
  },

  _handleDialogAccept: function _handleDialogAccept(t) {
    this.setTime(t);
    if (this.props.onChange) this.props.onChange(null, t);
  },

  _handleInputFocus: function _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(e) {
    e.preventDefault();

    this.setState({
      dialogTime: this.getTime()
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }
});

module.exports = TimePicker;