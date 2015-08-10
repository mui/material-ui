'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var PropTypes = require('./utils/prop-types');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');
var Children = require('./utils/children');

var IconButton = React.createClass({
  displayName: 'IconButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    tooltipStyles: React.PropTypes.object,
    tooltipPosition: PropTypes.cornersAndCenter,
    touch: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      tooltipShown: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      iconStyle: {},
      tooltipPosition: 'bottom-center'
    };
  },

  getStyles: function getStyles() {
    var spacing = this.context.muiTheme.spacing;
    var palette = this.context.muiTheme.palette;

    var styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: spacing.iconSize / 2,
        width: spacing.iconSize * 2,
        height: spacing.iconSize * 2,
        fontSize: 0
      },
      tooltip: {
        boxSizing: 'border-box'
      },
      icon: {
        color: palette.textColor,
        fill: palette.textColor
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: palette.disabledColor
      },
      disabled: {
        color: palette.disabledColor,
        fill: palette.disabledColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var iconClassName = _props.iconClassName;
    var tooltip = _props.tooltip;
    var touch = _props.touch;
    var iconStyle = _props.iconStyle;

    var other = _objectWithoutProperties(_props, ['disabled', 'iconClassName', 'tooltip', 'touch', 'iconStyle']);

    var fonticon = undefined;

    var styles = this.getStyles();
    var tooltipPosition = this.props.tooltipPosition.split('-');

    var tooltipElement = tooltip ? React.createElement(Tooltip, {
      ref: 'tooltip',
      label: tooltip,
      show: this.state.tooltipShown,
      touch: touch,
      style: this.mergeStyles(styles.tooltip, this.props.tooltipStyles),
      verticalPosition: tooltipPosition[0],
      horizontalPosition: tooltipPosition[1] }) : null;

    if (iconClassName) {
      var iconHoverColor = iconStyle.iconHoverColor;

      var iconStyleFontIcon = _objectWithoutProperties(iconStyle, ['iconHoverColor']);

      fonticon = React.createElement(
        FontIcon,
        {
          className: iconClassName,
          hoverColor: disabled ? null : iconHoverColor,
          style: this.mergeStyles(styles.icon, disabled ? styles.disabled : {}, iconStyleFontIcon) },
        this.props.children
      );
    }

    var childrenStyle = disabled ? this.mergeStyles(iconStyle, styles.disabled) : iconStyle;

    return React.createElement(
      EnhancedButton,
      _extends({}, other, {
        ref: 'button',
        centerRipple: true,
        disabled: disabled,
        style: this.mergeStyles(styles.root, this.props.style),
        onBlur: this._handleBlur,
        onFocus: this._handleFocus,
        onMouseLeave: this._handleMouseLeave,
        onMouseEnter: this._handleMouseEnter,
        onKeyboardFocus: this._handleKeyboardFocus }),
      tooltipElement,
      fonticon,
      Children.extend(this.props.children, {
        style: childrenStyle
      })
    );
  },

  setKeyboardFocus: function setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  },

  _showTooltip: function _showTooltip() {
    if (!this.props.disabled && this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },

  _hideTooltip: function _hideTooltip() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  },

  _handleBlur: function _handleBlur(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function _handleFocus(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseLeave: function _handleMouseLeave(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter: function _handleMouseEnter(e) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleKeyboardFocus: function _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused);
  }

});

module.exports = IconButton;