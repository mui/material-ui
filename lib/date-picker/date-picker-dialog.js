'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var ContextPure = require('../mixins/context-pure');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var CssEvent = require('../utils/css-event');
var KeyCode = require('../utils/key-code');
var Calendar = require('./calendar');
var Dialog = require('../dialog');
var DatePickerInline = require('./date-picker-inline');
var FlatButton = require('../flat-button');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');
var DateTime = require('../utils/date-time');

var DatePickerDialog = React.createClass({
  displayName: 'DatePickerDialog',

  mixins: [StylePropable, WindowListenable, ContextPure],

  statics: {
    getRelevantContextKeys: function getRelevantContextKeys(muiTheme) {
      return {
        buttonColor: muiTheme.datePicker.calendarTextColor
      };
    },
    getChildrenClasses: function getChildrenClasses() {
      return [Calendar, Dialog];
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    container: React.PropTypes.oneOf(['dialog', 'inline']),
    DateTimeFormat: React.PropTypes.func,
    locale: React.PropTypes.string,
    wordings: React.PropTypes.object,
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    style: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool
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

  getDefaultProps: function getDefaultProps() {
    return {
      DateTimeFormat: DateTime.DateTimeFormat,
      container: 'dialog',
      locale: 'en-US',
      wordings: {
        ok: 'OK',
        cancel: 'Cancel'
      }
    };
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp'
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  render: function render() {
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;
    var wordings = _props.wordings;
    var initialDate = _props.initialDate;
    var onAccept = _props.onAccept;
    var style = _props.style;
    var container = _props.container;
    var onDismiss = _props.onDismiss;
    var onShow = _props.onShow;

    var other = _objectWithoutProperties(_props, ['DateTimeFormat', 'locale', 'wordings', 'initialDate', 'onAccept', 'style', 'container', 'onDismiss', 'onShow']);

    var _constructor$getRelevantContextKeys = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    var calendarTextColor = _constructor$getRelevantContextKeys.calendarTextColor;

    var styles = {
      root: {
        fontSize: 14,
        color: calendarTextColor
      },

      dialogContent: {
        width: this.props.mode === 'landscape' ? 480 : 320
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
      label: wordings.cancel,
      secondary: true,
      style: styles.actions,
      onTouchTap: this._handleCancelTouchTap })];

    if (!this.props.autoOk) {
      actions.push(React.createElement(FlatButton, {
        key: 1,
        label: wordings.ok,
        secondary: true,
        disabled: this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled(),
        style: styles.actions,
        onTouchTap: this._handleOKTouchTap }));
    }
    // will change later when Popover is available.
    var Container = container === 'inline' ? DatePickerInline : Dialog;
    return React.createElement(
      Container,
      _extends({}, other, {
        ref: 'dialog',
        style: styles.root,
        contentStyle: styles.dialogContent,
        bodyStyle: styles.dialogBodyContent,
        actions: actions,
        onDismiss: typeof onDismiss === 'function' && onDismiss,
        onShow: typeof onShow === 'function' && onShow,
        repositionOnUpdate: false,
        open: this.state.open,
        onRequestClose: this.dismiss }),
      React.createElement(Calendar, {
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        ref: 'calendar',
        onDayTouchTap: this._onDayTouchTap,
        initialDate: this.props.initialDate,
        open: this.state.open,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        shouldDisableDate: this.props.shouldDisableDate,
        showYearSelector: this.props.showYearSelector,
        mode: this.props.mode })
    );
  },

  show: function show() {
    this.setState({
      open: true
    });
  },

  dismiss: function dismiss() {
    this.setState({
      open: false
    });
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

  _handleWindowKeyUp: function _handleWindowKeyUp(e) {
    if (this.state.open) {
      switch (e.keyCode) {
        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;
      }
    }
  }

});

module.exports = DatePickerDialog;