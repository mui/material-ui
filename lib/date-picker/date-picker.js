'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var DatePickerDialog = require('./date-picker-dialog');
var TextField = require('../text-field');

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    autoOk: React.PropTypes.bool,
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onDismiss: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool,
    style: React.PropTypes.object,
    textFieldStyle: React.PropTypes.object
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      formatDate: DateTime.format,
      autoOk: false,
      showYearSelector: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.defaultDate !== nextProps.defaultDate) {
      this.setDate(nextProps.defaultDate);
    }
  },

  render: function render() {
    var _props = this.props;
    var autoOk = _props.autoOk;
    var formatDate = _props.formatDate;
    var maxDate = _props.maxDate;
    var minDate = _props.minDate;
    var mode = _props.mode;
    var onDismiss = _props.onDismiss;
    var onFocus = _props.onFocus;
    var onTouchTap = _props.onTouchTap;
    var onShow = _props.onShow;
    var showYearSelector = _props.showYearSelector;
    var style = _props.style;
    var textFieldStyle = _props.textFieldStyle;

    var other = _objectWithoutProperties(_props, ['autoOk', 'formatDate', 'maxDate', 'minDate', 'mode', 'onDismiss', 'onFocus', 'onTouchTap', 'onShow', 'showYearSelector', 'style', 'textFieldStyle']);

    var defaultInputValue = undefined;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    return React.createElement(
      'div',
      { style: style },
      React.createElement(TextField, _extends({}, other, {
        style: textFieldStyle,
        ref: 'input',
        defaultValue: defaultInputValue,
        onFocus: this._handleInputFocus,
        onTouchTap: this._handleInputTouchTap })),
      React.createElement(DatePickerDialog, {
        ref: 'dialogWindow',
        mode: mode,
        initialDate: this.state.dialogDate,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: this._handleDialogDismiss,
        minDate: minDate,
        maxDate: maxDate,
        autoOk: autoOk,
        showYearSelector: showYearSelector,
        shouldDisableDate: this.props.shouldDisableDate,
        hideToolbarYearChange: this.props.hideToolbarYearChange })
    );
  },

  getDate: function getDate() {
    return this.state.date;
  },

  setDate: function setDate(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function _handleDialogAccept(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleDialogDismiss: function _handleDialogDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleInputFocus: function _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(e) {
    this.setState({
      dialogDate: this.getDate()
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp() {}

});

module.exports = DatePicker;

//TO DO: open the dialog if input has focus