'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');
var Paper = require('./paper');

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' + 'specified in ' + componentName + '.');
  }
}

var RaisedButton = React.createClass({
  displayName: 'RaisedButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: validateLabel,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
    backgroundColor: React.PropTypes.string,
    labelColor: React.PropTypes.string,
    disabledBackgroundColor: React.PropTypes.string,
    disabledLabelColor: React.PropTypes.string,
    fullWidth: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      hovered: false,
      touched: false,
      initialZDepth: zDepth,
      zDepth: zDepth
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var zDepth = nextProps.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth
    });
  },

  _getBackgroundColor: function _getBackgroundColor() {
    var disabledColor = this.props.disabledBackgroundColor ? this.props.disabledBackgroundColor : this.getTheme().disabledColor;

    return this.props.disabled ? disabledColor : this.props.backgroundColor ? this.props.backgroundColor : this.props.primary ? this.getTheme().primaryColor : this.props.secondary ? this.getTheme().secondaryColor : this.getTheme().color;
  },

  _getLabelColor: function _getLabelColor() {
    var disabledColor = this.props.disabledLabelColor ? this.props.disabledLabelColor : this.getTheme().disabledTextColor;

    return this.props.disabled ? disabledColor : this.props.labelColor ? this.props.labelColor : this.props.primary ? this.getTheme().primaryTextColor : this.props.secondary ? this.getTheme().secondaryTextColor : this.getTheme().textColor;
  },

  getThemeButton: function getThemeButton() {
    return this.context.muiTheme.component.button;
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.raisedButton;
  },

  getStyles: function getStyles() {
    var amount = this.props.primary || this.props.secondary ? 0.4 : 0.08;
    var styles = {
      root: {
        backgroundColor: 'none',
        display: 'inline-block',
        minWidth: this.props.fullWidth ? '100%' : this.getThemeButton().minWidth,
        height: this.getThemeButton().height,
        transition: Transitions.easeOut()
      },
      container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 2,
        transition: Transitions.easeOut(),
        backgroundColor: this._getBackgroundColor(),

        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)'
      },
      label: {
        position: 'relative',
        opacity: 1,
        fontSize: '14px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        padding: '0px ' + this.context.muiTheme.spacing.desktopGutterLess + 'px',
        userSelect: 'none',
        lineHeight: this.props.style && this.props.style.height ? this.props.style.height : this.getThemeButton().height + 'px',
        color: this._getLabelColor()
      },
      overlay: {
        transition: Transitions.easeOut(),
        top: 0
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getLabelColor(), amount)
      }
    };
    return styles;
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var label = _props.label;
    var primary = _props.primary;
    var secondary = _props.secondary;

    var other = _objectWithoutProperties(_props, ['disabled', 'label', 'primary', 'secondary']);

    var styles = this.getStyles();

    var labelElement = undefined;
    if (label) {
      labelElement = React.createElement(
        'span',
        { style: this.mergeAndPrefix(styles.label, this.props.labelStyle) },
        label
      );
    }

    var rippleColor = styles.label.color;
    var rippleOpacity = !(primary || secondary) ? 0.1 : 0.16;

    var buttonEventHandlers = disabled ? null : {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus
    };

    return React.createElement(
      Paper,
      {
        style: this.mergeAndPrefix(styles.root, this.props.style),
        zDepth: this.state.zDepth },
      React.createElement(
        EnhancedButton,
        _extends({}, other, buttonEventHandlers, {
          ref: 'container',
          disabled: disabled,
          style: this.mergeAndPrefix(styles.container),
          focusRippleColor: rippleColor,
          touchRippleColor: rippleColor,
          focusRippleOpacity: rippleOpacity,
          touchRippleOpacity: rippleOpacity }),
        React.createElement(
          'div',
          { ref: 'overlay', style: this.mergeAndPrefix(styles.overlay, this.state.hovered && !this.props.disabled && styles.overlayWhenHovered) },
          labelElement,
          this.props.children
        )
      )
    );
  },

  _handleMouseDown: function _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function _handleMouseUp(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) {
      this.setState({ hovered: true });
    }
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleTouchStart: function _handleTouchStart(e) {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1
    });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function _handleTouchEnd(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      var amount = this.props.primary || this.props.secondary ? 0.4 : 0.08;
      React.findDOMNode(this.refs.overlay).style.backgroundColor = ColorManipulator.fade(this.mergeAndPrefix(this.getStyles().label, this.props.labelStyle).color, amount);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      React.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  }
});

module.exports = RaisedButton;