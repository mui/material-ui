'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var ReactDOM = require('react-dom');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Children = require('./utils/children');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-raisedbutton');
var Paper = require('./paper');
var DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
var ThemeManager = require('./styles/theme-manager');

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
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: validateLabel,
    labelPosition: React.PropTypes.oneOf(['before', 'after']),
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
    fullWidth: React.PropTypes.bool,
    style: React.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      labelPosition: 'before' };
  },

  // Should be after but we keep it like for now (prevent breaking changes)
  getInitialState: function getInitialState() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      hovered: false,
      touched: false,
      initialZDepth: zDepth,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var zDepth = nextProps.disabled ? 0 : 1;
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
      muiTheme: newMuiTheme
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
    return this.state.muiTheme.button;
  },

  getTheme: function getTheme() {
    return this.state.muiTheme.raisedButton;
  },

  getStyles: function getStyles() {

    var amount = this.props.primary || this.props.secondary ? 0.4 : 0.08;
    var styles = {
      root: {
        display: 'inline-block',
        minWidth: this.props.fullWidth ? '100%' : this.getThemeButton().minWidth,
        height: this.getThemeButton().height,
        transition: Transitions.easeOut(),
        borderRadius: '25px'
      },
      container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        padding: 0,
        overflow: 'hidden',
        border: '2px solid ' + this.getTheme().secondaryTextColor,
        borderRadius: '25px',
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
        textTransform: this.getTheme().textTransform ? this.getTheme().textTransform : this.getThemeButton().textTransform ? this.getThemeButton().textTransform : 'uppercase',
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        padding: '0px ' + this.state.muiTheme.rawTheme.spacing.desktopGutterLess + 'px',
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
    var children = _props.children;
    var disabled = _props.disabled;
    var label = _props.label;
    var labelPosition = _props.labelPosition;
    var labelStyle = _props.labelStyle;
    var primary = _props.primary;
    var secondary = _props.secondary;

    var other = _objectWithoutProperties(_props, ['children', 'disabled', 'label', 'labelPosition', 'labelStyle', 'primary', 'secondary']);

    var styles = this.getStyles();

    var labelElement = undefined;
    if (label) {
      labelElement = React.createElement(
        'span',
        { style: this.prepareStyles(styles.label, labelStyle) },
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

    // Place label before or after children.
    var childrenFragment = labelPosition === 'before' ? { labelElement: labelElement, children: children } : { children: children, labelElement: labelElement };
    var enhancedButtonChildren = Children.create(childrenFragment);

    return React.createElement(
      Paper,
      {
        style: this.mergeStyles(styles.root, this.props.style),
        zDepth: this.state.zDepth },
      React.createElement(
        EnhancedButton,
        _extends({}, other, buttonEventHandlers, {
          ref: 'container',
          disabled: disabled,
          style: this.mergeStyles(styles.container),
          focusRippleColor: rippleColor,
          touchRippleColor: rippleColor,
          focusRippleOpacity: rippleOpacity,
          touchRippleOpacity: rippleOpacity }),
        React.createElement(
          'div',
          { ref: 'overlay', style: this.prepareStyles(styles.overlay, this.state.hovered && !this.props.disabled && styles.overlayWhenHovered) },
          enhancedButtonChildren
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
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor = ColorManipulator.fade(this.prepareStyles(this.getStyles().label, this.props.labelStyle).color, amount);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  }
});

module.exports = RaisedButton;