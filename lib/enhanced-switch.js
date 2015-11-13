'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var UniqueId = require('./utils/unique-id');
var WindowListenable = require('./mixins/window-listenable');
var ClearFix = require('./clearfix');
var FocusRipple = require('./ripples/focus-ripple');
var TouchRipple = require('./ripples/touch-ripple');
var Paper = require('./paper');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

var EnhancedSwitch = React.createClass({
  displayName: 'EnhancedSwitch',

  mixins: [WindowListenable, StylePropable],

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
    id: React.PropTypes.string,
    inputType: React.PropTypes.string.isRequired,
    switchElement: React.PropTypes.element.isRequired,
    onParentShouldUpdate: React.PropTypes.func.isRequired,
    switched: React.PropTypes.bool.isRequired,
    rippleStyle: React.PropTypes.object,
    rippleColor: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    thumbStyle: React.PropTypes.object,
    trackStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    label: React.PropTypes.node,
    onSwitch: React.PropTypes.func,
    required: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    defaultSwitched: React.PropTypes.bool,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
    disableFocusRipple: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  windowListeners: {
    keydown: '_handleWindowKeydown',
    keyup: '_handleWindowKeyup'
  },

  getInitialState: function getInitialState() {
    return {
      isKeyboardFocused: false,
      parentWidth: 100,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  getEvenWidth: function getEvenWidth() {
    return parseInt(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.root)).getPropertyValue('width'), 10);
  },

  componentDidMount: function componentDidMount() {
    var inputNode = ReactDOM.findDOMNode(this.refs.checkbox);
    if (!this.props.switched || inputNode.checked !== this.props.switched) {
      this.props.onParentShouldUpdate(inputNode.checked);
    }

    window.addEventListener("resize", this._handleResize);

    this._handleResize();
  },

  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasToggledProp = nextProps.hasOwnProperty('toggled');
    var hasNewDefaultProp = nextProps.hasOwnProperty('defaultSwitched') && nextProps.defaultSwitched !== this.props.defaultSwitched;
    var newState = {};
    newState.muiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;

    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasToggledProp) {
      newState.switched = nextProps.toggled;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState.switched !== undefined && newState.switched !== this.props.switched) {
      this.props.onParentShouldUpdate(newState.switched);
    }

    this.setState(newState);
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.rawTheme.palette;
  },

  getStyles: function getStyles() {
    var spacing = this.state.muiTheme.rawTheme.spacing;
    var switchWidth = 60 - spacing.desktopGutterLess;
    var labelWidth = 'calc(100% - 60px)';
    var styles = {
      root: {
        position: 'relative',
        cursor: this.props.disabled ? 'default' : 'pointer',
        overflow: 'visible',
        display: 'table',
        height: 'auto',
        width: '100%'
      },
      input: {
        position: 'absolute',
        cursor: this.props.disabled ? 'default' : 'pointer',
        pointerEvents: 'all',
        opacity: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        left: 0,
        boxSizing: 'border-box',
        padding: 0,
        margin: 0
      },
      controls: {
        width: '100%',
        height: '100%'
      },
      label: {
        float: 'left',
        position: 'relative',
        display: 'block',
        width: labelWidth,
        lineHeight: '24px',
        color: this.getTheme().textColor
      },
      wrap: {
        transition: Transitions.easeOut(),
        float: 'left',
        position: 'relative',
        display: 'block',
        width: switchWidth,
        marginRight: this.props.labelPosition === 'right' ? spacing.desktopGutterLess : 0,
        marginLeft: this.props.labelPosition === 'left' ? spacing.desktopGutterLess : 0
      },
      ripple: {
        height: '200%',
        width: '200%',
        top: -12,
        left: -12
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var type = _props.type;
    var name = _props.name;
    var value = _props.value;
    var label = _props.label;
    var onSwitch = _props.onSwitch;
    var defaultSwitched = _props.defaultSwitched;
    var onBlur = _props.onBlur;
    var onFocus = _props.onFocus;
    var onMouseUp = _props.onMouseUp;
    var onMouseDown = _props.onMouseDown;
    var onMouseLeave = _props.onMouseLeave;
    var onTouchStart = _props.onTouchStart;
    var onTouchEnd = _props.onTouchEnd;
    var disableTouchRipple = _props.disableTouchRipple;
    var disableFocusRipple = _props.disableFocusRipple;
    var className = _props.className;

    var other = _objectWithoutProperties(_props, ['type', 'name', 'value', 'label', 'onSwitch', 'defaultSwitched', 'onBlur', 'onFocus', 'onMouseUp', 'onMouseDown', 'onMouseLeave', 'onTouchStart', 'onTouchEnd', 'disableTouchRipple', 'disableFocusRipple', 'className']);

    var styles = this.getStyles();
    var wrapStyles = this.prepareStyles(styles.wrap, this.props.iconStyle);
    var rippleStyle = this.prepareStyles(styles.ripple, this.props.rippleStyle);
    var rippleColor = this.props.hasOwnProperty('rippleColor') ? this.props.rippleColor : this.getTheme().primary1Color;

    if (this.props.thumbStyle) {
      wrapStyles.marginLeft /= 2;
      wrapStyles.marginRight /= 2;
    }

    var inputId = this.props.id || UniqueId.generate();

    var labelStyle = this.prepareStyles(styles.label, this.props.labelStyle);
    var labelElement = this.props.label ? React.createElement(
      'label',
      { style: labelStyle, htmlFor: inputId },
      this.props.label
    ) : null;

    var inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      style: this.prepareStyles(styles.input),
      name: this.props.name,
      value: this.props.value,
      defaultChecked: this.props.defaultSwitched,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus
    };

    var hideTouchRipple = this.props.disabled || disableTouchRipple;

    if (!hideTouchRipple) {
      inputProps.onMouseUp = this._handleMouseUp;
      inputProps.onMouseDown = this._handleMouseDown;
      inputProps.onMouseLeave = this._handleMouseLeave;
      inputProps.onTouchStart = this._handleTouchStart;
      inputProps.onTouchEnd = this._handleTouchEnd;
    }

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    var inputElement = React.createElement('input', _extends({}, other, inputProps));

    var touchRipple = React.createElement(TouchRipple, {
      ref: 'touchRipple',
      key: 'touchRipple',
      style: rippleStyle,
      color: rippleColor,
      centerRipple: true });

    var focusRipple = React.createElement(FocusRipple, {
      key: 'focusRipple',
      innerStyle: rippleStyle,
      color: rippleColor,
      show: this.state.isKeyboardFocused });

    var ripples = [hideTouchRipple ? null : touchRipple, this.props.disabled || disableFocusRipple ? null : focusRipple];

    // If toggle component (indicated by whether the style includes thumb) manually lay out
    // elements in order to nest ripple elements
    var switchElement = !this.props.thumbStyle ? React.createElement(
      'div',
      { style: wrapStyles },
      this.props.switchElement,
      ripples
    ) : React.createElement(
      'div',
      { style: wrapStyles },
      React.createElement('div', { style: this.prepareStyles(this.props.trackStyle) }),
      React.createElement(
        Paper,
        { style: this.props.thumbStyle, zDepth: 1, circle: true },
        ' ',
        ripples,
        ' '
      )
    );

    var labelPositionExist = this.props.labelPosition;

    // Position is left if not defined or invalid.
    var elementsInOrder = labelPositionExist && this.props.labelPosition.toUpperCase() === "RIGHT" ? React.createElement(
      ClearFix,
      { style: styles.controls },
      switchElement,
      labelElement
    ) : React.createElement(
      ClearFix,
      { style: styles.controls },
      labelElement,
      switchElement
    );

    return React.createElement(
      'div',
      { ref: 'root', className: className, style: this.prepareStyles(styles.root, this.props.style) },
      inputElement,
      elementsInOrder
    );
  },

  isSwitched: function isSwitched() {
    return ReactDOM.findDOMNode(this.refs.checkbox).checked;
  },

  // no callback here because there is no event
  setSwitched: function setSwitched(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked === false) {
      this.props.onParentShouldUpdate(newSwitchedValue);
      ReactDOM.findDOMNode(this.refs.checkbox).checked = newSwitchedValue;
    } else if (process.env.NODE_ENV !== 'production') {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  getValue: function getValue() {
    return ReactDOM.findDOMNode(this.refs.checkbox).value;
  },

  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  _handleChange: function _handleChange(e) {
    this._tabPressed = false;
    this.setState({
      isKeyboardFocused: false
    });

    var isInputChecked = ReactDOM.findDOMNode(this.refs.checkbox).checked;

    if (!this.props.hasOwnProperty('checked')) {
      this.props.onParentShouldUpdate(isInputChecked);
    }
    if (this.props.onSwitch) {
      this.props.onSwitch(e, isInputChecked);
    }
  },

  // Checkbox inputs only use SPACE to change their state. Using ENTER will
  // update the ui but not the input.
  _handleWindowKeydown: function _handleWindowKeydown(e) {
    if (e.keyCode === KeyCode.TAB) {
      this._tabPressed = true;
    }
    if (e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  _handleWindowKeyup: function _handleWindowKeyup(e) {
    if (e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleChange(e);
    }
  },

  /**
   * Because both the ripples and the checkbox input cannot share pointer
   * events, the checkbox input takes control of pointer events and calls
   * ripple animations manually.
   */
  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.refs.touchRipple.start(e);
    }
  },

  _handleMouseUp: function _handleMouseUp() {
    this.refs.touchRipple.end();
  },

  _handleMouseLeave: function _handleMouseLeave() {
    this.refs.touchRipple.end();
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.refs.touchRipple.start(e);
  },

  _handleTouchEnd: function _handleTouchEnd() {
    this.refs.touchRipple.end();
  },

  _handleBlur: function _handleBlur(e) {
    this.setState({
      isKeyboardFocused: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  },

  _handleFocus: function _handleFocus(e) {
    var _this = this;

    //setTimeout is needed becuase the focus event fires first
    //Wait so that we can capture if this was a keyboard focus
    //or touch focus
    setTimeout(function () {
      if (_this._tabPressed) {
        _this.setState({
          isKeyboardFocused: true
        });
      }
    }, 150);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  },

  _handleResize: function _handleResize() {
    this.setState({ parentWidth: this.getEvenWidth() });
  }

});

module.exports = EnhancedSwitch;