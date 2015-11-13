'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var StylePropable = require('./mixins/style-propable');
var Colors = require('./styles/colors');
var Children = require('./utils/children');
var Events = require('./utils/events');
var KeyCode = require('./utils/key-code');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var styleInjected = false;
var listening = false;
var tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    var style = document.createElement("style");
    style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    Events.on(window, 'keydown', function (e) {
      tabPressed = e.keyCode === KeyCode.TAB;
    });
    listening = true;
  }
}

var EnhancedButton = React.createClass({
  displayName: 'EnhancedButton',

  mixins: [PureRenderMixin, StylePropable],

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
    tabIndex: React.PropTypes.number,
    style: React.PropTypes.object
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
      isKeyboardFocused: !this.props.disabled && this.props.keyboardFocused && !this.props.disableKeyboardFocus,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },

  componentDidMount: function componentDidMount() {
    injectStyle();
    listenForTabPresses();
  },

  render: function render() {
    var _props = this.props;
    var centerRipple = _props.centerRipple;
    var children = _props.children;
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

    var other = _objectWithoutProperties(_props, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'linkButton', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onFocus', 'onKeyUp', 'onKeyDown', 'onTouchTap', 'style', 'tabIndex', 'type']);

    var mergedStyles = this.prepareStyles({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      font: 'inherit',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      tapHighlightColor: Colors.transparent,
      appearance: linkButton ? null : 'button',
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none'
    }, style);

    if (disabled && linkButton) {
      return React.createElement(
        'span',
        _extends({}, other, {
          style: mergedStyles }),
        children
      );
    }

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
    var buttonChildren = this._createButtonChildren();

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

  _cancelFocusTimeout: function _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  },

  _createButtonChildren: function _createButtonChildren() {
    var _props2 = this.props;
    var centerRipple = _props2.centerRipple;
    var children = _props2.children;
    var disabled = _props2.disabled;
    var disableFocusRipple = _props2.disableFocusRipple;
    var disableKeyboardFocus = _props2.disableKeyboardFocus;
    var disableTouchRipple = _props2.disableTouchRipple;
    var focusRippleColor = _props2.focusRippleColor;
    var focusRippleOpacity = _props2.focusRippleOpacity;
    var touchRippleColor = _props2.touchRippleColor;
    var touchRippleOpacity = _props2.touchRippleOpacity;
    var isKeyboardFocused = this.state.isKeyboardFocused;

    //Focus Ripple
    var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? React.createElement(FocusRipple, {
      color: focusRippleColor,
      opacity: focusRippleOpacity,
      show: isKeyboardFocused
    }) : undefined;

    //Touch Ripple
    var touchRipple = !disabled && !disableTouchRipple ? React.createElement(
      TouchRipple,
      {
        centerRipple: centerRipple,
        color: touchRippleColor,
        opacity: touchRippleOpacity },
      children
    ) : undefined;

    return Children.create({
      focusRipple: focusRipple,
      touchRipple: touchRipple,
      children: touchRipple ? undefined : children
    });
  },

  _handleKeyDown: function _handleKeyDown(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
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
        if (tabPressed) {
          _this.setKeyboardFocus(e);
        }
      }, 150);

      this.props.onFocus(e);
    }
  },

  _handleTouchTap: function _handleTouchTap(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(e);
      this.props.onTouchTap(e);
    }
  }

});

module.exports = EnhancedButton;