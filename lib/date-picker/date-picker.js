'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var DatePickerDialog = require('./date-picker-dialog');
var TextField = require('../text-field');
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var DatePicker = React.createClass({
  displayName: 'DatePicker',

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
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

  propTypes: {
    container: React.PropTypes.oneOf(['dialog', 'inline']),
    DateTimeFormat: React.PropTypes.func,
    locale: React.PropTypes.string,
    wordings: React.PropTypes.object,
    autoOk: React.PropTypes.bool,
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
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
      showYearSelector: false,
      style: {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
      dialogDate: new Date(),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this._isControlled()) {
      var newDate = this._getControlledDate(nextProps);
      if (!DateTime.isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate
        });
      }
    }
  },

  render: function render() {
    var _props = this.props;
    var container = _props.container;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var wordings = _props.wordings;
    var autoOk = _props.autoOk;
    var defaultDate = _props.defaultDate;
    var formatDate = _props.formatDate;
    var maxDate = _props.maxDate;
    var minDate = _props.minDate;
    var mode = _props.mode;
    var onDismiss = _props.onDismiss;
    var onFocus = _props.onFocus;
    var onShow = _props.onShow;
    var onTouchTap = _props.onTouchTap;
    var showYearSelector = _props.showYearSelector;
    var style = _props.style;
    var textFieldStyle = _props.textFieldStyle;
    var valueLink = _props.valueLink;

    var other = _objectWithoutProperties(_props, ['container', 'DateTimeFormat', 'locale', 'wordings', 'autoOk', 'defaultDate', 'formatDate', 'maxDate', 'minDate', 'mode', 'onDismiss', 'onFocus', 'onShow', 'onTouchTap', 'showYearSelector', 'style', 'textFieldStyle', 'valueLink']);

    return React.createElement(
      'div',
      { style: this.prepareStyles(style) },
      React.createElement(TextField, _extends({}, other, {
        style: textFieldStyle,
        ref: 'input',
        value: this.state.date ? formatDate(this.state.date) : undefined,
        onFocus: this._handleInputFocus,
        onTouchTap: this._handleInputTouchTap })),
      React.createElement(DatePickerDialog, {
        container: container,
        ref: 'dialogWindow',
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        wordings: wordings,
        mode: mode,
        initialDate: this.state.dialogDate,
        onAccept: this._handleDialogAccept,
        onShow: onShow,
        onDismiss: onDismiss,
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
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call DatePicker.setDate when value or valueLink is defined as a property.');
    }
    this.setState({
      date: d
    });
  },

  /**
   * Open the date-picker dialog programmatically from a parent.
   */
  openDialog: function openDialog() {
    this.setState({
      dialogDate: this.getDate()
    }, this.refs.dialogWindow.show);
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus: function focus() {
    this.openDialog();
  },

  _handleDialogAccept: function _handleDialogAccept(d) {
    if (!this._isControlled()) {
      this.setDate(d);
    }
    if (this.props.onChange) this.props.onChange(null, d);
    if (this.props.valueLink) this.props.valueLink.requestChange(d);
  },

  _handleInputFocus: function _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(event) {
    var _this = this;

    if (this.props.onTouchTap) this.props.onTouchTap(event);

    setTimeout(function () {
      _this.openDialog();
    }, 0);
  },

  _handleWindowKeyUp: function _handleWindowKeyUp() {
    //TO DO: open the dialog if input has focus
  },

  _isControlled: function _isControlled() {
    return this.props.hasOwnProperty('value') || this.props.hasOwnProperty('valueLink');
  },

  _getControlledDate: function _getControlledDate() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

    if (DateTime.isDateObject(props.value)) {
      return props.value;
    } else if (props.valueLink && DateTime.isDateObject(props.valueLink.value)) {
      return props.valueLink.value;
    }
  }

});

module.exports = DatePicker;