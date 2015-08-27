'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var CssEvent = require('../utils/css-event');
var KeyCode = require('../utils/key-code');
var Calendar = require('./calendar');
var Dialog = require('../dialog');
var FlatButton = require('../flat-button');

var DatePickerDialog = React.createClass({
  displayName: 'DatePickerDialog',

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onClickAway: React.PropTypes.func,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    showYearSelector: React.PropTypes.bool
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp'
  },

  getInitialState: function getInitialState() {
    return {
      isCalendarActive: false,
      showMonthDayPicker: true
    };
  },

  render: function render() {
    var _props = this.props;
    var initialDate = _props.initialDate;
    var onAccept = _props.onAccept;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['initialDate', 'onAccept', 'style']);

    var styles = {
      root: {
        fontSize: 14,
        color: this.context.muiTheme.component.datePicker.calendarTextColor
      },

      dialogContent: {
        width: this.props.mode === 'landscape' ? 560 : 280
      },

      dialogBodyContent: {
        padding: 0
      },

      actions: {
        marginRight: 8
      }
    };

    var actions = [React.createElement(FlatButton, {
      key: 0,
      label: 'Cancel',
      secondary: true,
      style: styles.actions,
      onTouchTap: this._handleCancelTouchTap })];

    if (!this.props.autoOk) {
      actions.push(React.createElement(FlatButton, {
        key: 1,
        label: 'OK',
        secondary: true,
        disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
        style: styles.actions,
        onTouchTap: this._handleOKTouchTap }));
    }

    return React.createElement(
      Dialog,
      _extends({}, other, {
        ref: 'dialog',
        style: styles.root,
        contentStyle: styles.dialogContent,
        bodyStyle: styles.dialogBodyContent,
        actions: actions,
        onDismiss: this._handleDialogDismiss,
        onShow: this._handleDialogShow,
        onClickAway: this._handleDialogClickAway,
        repositionOnUpdate: false }),
      React.createElement(Calendar, {
        ref: 'calendar',
        onDayTouchTap: this._onDayTouchTap,
        initialDate: this.props.initialDate,
        isActive: this.state.isCalendarActive,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        shouldDisableDate: this.props.shouldDisableDate,
        shouldShowMonthDayPickerFirst: this.state.showMonthDayPicker,
        hideToolbarYearChange: this.props.hideToolbarYearChange,
        showYearSelector: this.props.showYearSelector,
        mode: this.props.mode })
    );
  },

  show: function show() {
    this.refs.dialog.show();
  },

  dismiss: function dismiss() {
    this.refs.dialog.dismiss();
  },

  _onDayTouchTap: function _onDayTouchTap() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap, 300);
    }
  },

  _handleCancelTouchTap: function _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap: function _handleOKTouchTap() {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  },

  _handleDialogShow: function _handleDialogShow() {
    this.setState({
      isCalendarActive: true
    });

    if (this.props.onShow) this.props.onShow();
  },

  _handleDialogDismiss: function _handleDialogDismiss() {
    var _this = this;

    CssEvent.onTransitionEnd(this.refs.dialog.getDOMNode(), function () {
      _this.setState({
        isCalendarActive: false,
        showMonthDayPicker: true
      });
    });

    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleDialogClickAway: function _handleDialogClickAway() {
    var _this2 = this;

    CssEvent.onTransitionEnd(this.refs.dialog.getDOMNode(), function () {
      _this2.setState({
        isCalendarActive: false,
        showMonthDayPicker: true
      });
    });

    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (this.state.isCalendarActive) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;