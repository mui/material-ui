'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Transitions = require('./styles/transitions');
var Children = require('./utils/children');
var ColorManipulator = require('./utils/color-manipulator');
var ImmutabilityHelper = require('./utils/immutability-helper');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');
var FlatButtonLabel = require('./buttons/flat-button-label');

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' + 'specified in ' + componentName + '.');
  }
}

var FlatButton = React.createClass({
  displayName: 'FlatButton',

  mixins: [PureRenderMixin],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    label: validateLabel,
    labelPosition: React.PropTypes.oneOf(['before', 'after']),
    labelStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    rippleColor: React.PropTypes.string,
    secondary: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      labelStyle: {},
      labelPosition: 'before',
      onKeyboardFocus: function onKeyboardFocus() {},
      onMouseEnter: function onMouseEnter() {},
      onMouseLeave: function onMouseLeave() {},
      onTouchStart: function onTouchStart() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false
    };
  },

  getContextProps: function getContextProps() {
    var theme = this.context.muiTheme;
    var buttonTheme = theme.component.button;
    var flatButtonTheme = theme.component.flatButton;

    return {
      buttonColor: flatButtonTheme.color,
      buttonHeight: buttonTheme.height,
      buttonMinWidth: buttonTheme.minWidth,
      disabledTextColor: flatButtonTheme.disabledTextColor,
      primaryTextColor: flatButtonTheme.primaryTextColor,
      secondaryTextColor: flatButtonTheme.secondaryTextColor,
      textColor: flatButtonTheme.textColor
    };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var disabled = _props.disabled;
    var hoverColor = _props.hoverColor;
    var label = _props.label;
    var labelStyle = _props.labelStyle;
    var labelPosition = _props.labelPosition;
    var onKeyboardFocus = _props.onKeyboardFocus;
    var onMouseLeave = _props.onMouseLeave;
    var onMouseEnter = _props.onMouseEnter;
    var onTouchStart = _props.onTouchStart;
    var primary = _props.primary;
    var rippleColor = _props.rippleColor;
    var secondary = _props.secondary;
    var style = _props.style;

    var other = _objectWithoutProperties(_props, ['children', 'disabled', 'hoverColor', 'label', 'labelStyle', 'labelPosition', 'onKeyboardFocus', 'onMouseLeave', 'onMouseEnter', 'onTouchStart', 'primary', 'rippleColor', 'secondary', 'style']);

    var contextProps = this.getContextProps();

    var defaultColor = disabled ? contextProps.disabledTextColor : primary ? contextProps.primaryTextColor : secondary ? contextProps.secondaryTextColor : contextProps.textColor;

    var defaultHoverColor = ColorManipulator.fade(ColorManipulator.lighten(defaultColor, 0.4), 0.15);
    var defaultRippleColor = ColorManipulator.fade(defaultColor, 0.8);
    var buttonHoverColor = hoverColor || defaultHoverColor;
    var buttonRippleColor = rippleColor || defaultRippleColor;
    var hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    var mergedRootStyles = ImmutabilityHelper.merge({
      color: defaultColor,
      transition: Transitions.easeOut(),
      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: 'uppercase',
      fontWeight: Typography.fontWeightMedium,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : contextProps.buttonColor,
      lineHeight: contextProps.buttonHeight + 'px',
      minWidth: contextProps.buttonMinWidth,
      padding: 0,
      margin: 0,
      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739
      transform: 'translate3d(0, 0, 0)'
    }, style);

    var labelElement = label ? React.createElement(FlatButtonLabel, { label: label, style: labelStyle }) : undefined;
    // Place label before or after children.
    var childrenFragment = labelPosition === 'before' ? { labelElement: labelElement, children: children } : { children: children, labelElement: labelElement };
    var enhancedButtonChildren = Children.create(childrenFragment);

    return React.createElement(
      EnhancedButton,
      _extends({}, other, {
        disabled: disabled,
        focusRippleColor: buttonRippleColor,
        onKeyboardFocus: this._handleKeyboardFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onTouchStart: this._handleTouchStart,
        style: mergedRootStyles,
        touchRippleColor: buttonRippleColor }),
      enhancedButtonChildren
    );
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({ isKeyboardFocused: isKeyboardFocused });
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({ hovered: true });
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    this.setState({ hovered: false });
    this.props.onMouseLeave(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({ touch: true });
    this.props.onTouchStart(e);
  }

});

module.exports = FlatButton;