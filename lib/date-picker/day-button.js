'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/transitions');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');
var ThemeManager = require('../styles/theme-manager');

var DayButton = React.createClass({
  displayName: 'DayButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool
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
      selected: false,
      disabled: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      hover: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.datePicker;
  },

  render: function render() {
    var _props = this.props;
    var date = _props.date;
    var onTouchTap = _props.onTouchTap;
    var selected = _props.selected;

    var other = _objectWithoutProperties(_props, ['date', 'onTouchTap', 'selected']);

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        position: 'relative',
        float: 'left',
        width: 41,
        padding: '4px 2px'
      },

      label: {
        position: 'relative',
        color: this.state.muiTheme.rawTheme.palette.textColor
      },

      buttonState: {
        position: 'absolute',
        height: 36,
        width: 36,
        top: 2,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: this.getTheme().selectColor
      }
    };

    if (this.state.hover) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = '0.6';
      styles.buttonState.transform = 'scale(1)';
    }

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.buttonState.opacity = 1;
      styles.buttonState.transform = 'scale(1)';
    } else if (this.props.disabled) {
      styles.root.opacity = '0.6';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
      styles.label.color = this.getTheme().color;
    }

    return this.props.date ? React.createElement(
      EnhancedButton,
      _extends({}, other, {
        style: styles.root,
        hoverStyle: styles.hover,
        disabled: this.props.disabled,
        disableFocusRipple: true,
        disableTouchRipple: true,
        onMouseEnter: this._handleMouseEnter,
        onMouseLeave: this._handleMouseLeave,
        onTouchTap: this._handleTouchTap,
        onKeyboardFocus: this._handleKeyboardFocus }),
      React.createElement('div', { style: this.prepareStyles(styles.buttonState) }),
      React.createElement(
        'span',
        { style: this.prepareStyles(styles.label) },
        this.props.date.getDate()
      )
    ) : React.createElement('span', { style: this.prepareStyles(styles.root) });
  },

  _handleMouseEnter: function _handleMouseEnter() {
    if (!this.props.disabled) this.setState({ hover: true });
  },

  _handleMouseLeave: function _handleMouseLeave() {
    if (!this.props.disabled) this.setState({ hover: false });
  },

  _handleTouchTap: function _handleTouchTap(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (!this.props.disabled && this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  }

});

module.exports = DayButton;