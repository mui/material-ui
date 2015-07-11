'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var KeyCode = require('./utils/key-code');
var Colors = require('./styles/colors');
var StylePropable = require('./mixins/style-propable');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');

var _tabPressed = false;

var EnhancedButton = React.createClass({
  displayName: 'EnhancedButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    centerRipple: React.PropTypes.bool,
    containerElement: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    keyboardFocused: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    touchRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    touchRippleOpacity: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    tabIndex: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      containerElement: 'button',
      onBlur: function onBlur() {},
      onFocus: function onFocus() {},
      onKeyboardFocus: function onKeyboardFocus() {},
      onKeyDown: function onKeyDown() {},
      onKeyUp: function onKeyUp() {},
      onTouchTap: function onTouchTap() {},
      tabIndex: 0,
      type: 'button'
    };
  },

  getInitialState: function getInitialState() {
    return {
      isKeyboardFocused: !this.props.disabled && this.props.keyboardFocused && !this.props.disableKeyboardFocus
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },

  // Remove inner padding and border in Firefox 4+.
  componentDidMount: function componentDidMount() {
    if (!EnhancedButton.hasStyleBeenInjected) {
      var style = document.createElement('style');
      style.innerHTML = 'button::-moz-focus-inner,' + 'input::-moz-focus-inner {' + ' border: 0;' + ' padding: 0;' + ' }';
      document.body.appendChild(style);
      EnhancedButton.hasStyleBeenInjected = true;
    }
  },

  render: function render() {
    var _props = this.props;
    var centerRipple = _props.centerRipple;
    var containerElement = _props.containerElement;
    var disabled = _props.disabled;
    var disableFocusRipple = _props.disableFocusRipple;
    var disableKeyboardFocus = _props.disableKeyboardFocus;
    var disableTouchRipple = _props.disableTouchRipple;
    var focusRippleColor = _props.focusRippleColor;
    var focusRippleOpacity = _props.focusRippleOpacity;
    var linkButton = _props.linkButton;
    var touchRippleColor = _props.touchRippleColor;
    var touchRippleOpacity = _props.touchRippleOpacity;
    var onBlur = _props.onBlur;
    var onFocus = _props.onFocus;
    var onKeyUp = _props.onKeyUp;
    var onKeyDown = _props.onKeyDown;
    var onTouchTap = _props.onTouchTap;
    var style = _props.style;
    var tabIndex = _props.tabIndex;
    var type = _props.type;

    var other = _objectWithoutProperties(_props, ['centerRipple', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'linkButton', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onFocus', 'onKeyUp', 'onKeyDown', 'onTouchTap', 'style', 'tabIndex', 'type']);

    var mergedStyles = this.mergeAndPrefix({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      font: 'inherit',
      fontFamily: this.context.muiTheme.contentFontFamily,
      WebkitTapHighlightColor: Colors.transparent,
      WebkitAppearance: !this.props.linkButton && 'button',
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none'
    }, style);

    var buttonProps = _extends({}, other, {
      style: mergedStyles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      onKeyUp: this._handleKeyUp,
      onKeyDown: this._handleKeyDown,
      tabIndex: tabIndex,
      type: type
    });

    var buttonChildren = [];

    // Create ripples if we need to
    if (!disabled && !disableTouchRipple) {
      buttonChildren.push(React.createElement(
        TouchRipple,
        {
          key: 'touchRipple',
          centerRipple: centerRipple,
          color: touchRippleColor,
          opacity: touchRippleOpacity },
        this.props.children
      ));
    } else {
      buttonChildren.push(this.props.children);
    }

    if (!disabled && !disableFocusRipple && !disableKeyboardFocus) {
      buttonChildren.push(React.createElement(FocusRipple, {
        key: 'focusRipple',
        color: focusRippleColor,
        opacity: focusRippleOpacity,
        show: this.state.isKeyboardFocused
      }));
    }

    if (disabled && linkButton) {
      return React.createElement(
        'span',
        _extends({}, other, {
          style: mergedStyles }),
        this.props.children
      );
    }

    return React.isValidElement(containerElement) ? React.cloneElement(containerElement, buttonProps, buttonChildren) : React.createElement(linkButton ? 'a' : containerElement, buttonProps, buttonChildren);
  },

  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  removeKeyboardFocus: function removeKeyboardFocus(e) {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
      this.props.onKeyboardFocus(e, false);
    }
  },

  setKeyboardFocus: function setKeyboardFocus(e) {
    if (!this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: true });
      this.props.onKeyboardFocus(e, true);
    }
  },

  _handleKeyDown: function _handleKeyDown(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (e.keyCode === KeyCode.TAB) {
        _tabPressed = true;
      }
      if (e.keyCode === KeyCode.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
    this.props.onKeyDown(e);
  },

  _handleKeyUp: function _handleKeyUp(e) {
    if (!this.props.disabled && e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
    this.props.onKeyUp(e);
  },

  _handleBlur: function _handleBlur(e) {
    this._cancelFocusTimeout();
    this.removeKeyboardFocus(e);
    this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    var _this = this;

    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(function () {
        if (_tabPressed) {
          _this.setKeyboardFocus(e);
        }
      }, 150);

      this.props.onFocus(e);
    }
  },

  _handleTouchTap: function _handleTouchTap(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      _tabPressed = false;
      this.removeKeyboardFocus(e);
      this.props.onTouchTap(e);
    }
  },

  _cancelFocusTimeout: function _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  }

});

EnhancedButton.hasStyleBeenInjected = false;

module.exports = EnhancedButton;