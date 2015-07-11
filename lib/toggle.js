'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Paper = require('./paper');
var EnhancedSwitch = require('./enhanced-switch');

var Toggle = React.createClass({
  displayName: 'Toggle',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    elementStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      switched: this.props.toggled || this.props.defaultToggled || this.props.valueLink && this.props.valueLink.value || false
    };
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.toggle;
  },

  getStyles: function getStyles() {
    var toggleSize = 20;
    var toggleTrackWidth = 36;
    var styles = {
      icon: {
        width: 36,
        padding: '4px 0px 6px 2px'
      },
      toggleElement: {
        width: toggleTrackWidth
      },
      track: {
        transition: Transitions.easeOut(),
        width: '100%',
        height: 14,
        borderRadius: 30,
        backgroundColor: this.getTheme().trackOffColor
      },
      thumb: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        top: 1,
        left: 0,
        width: toggleSize,
        height: toggleSize,
        lineHeight: '24px',
        borderRadius: '50%',
        backgroundColor: this.getTheme().thumbOffColor
      },
      trackWhenSwitched: {
        backgroundColor: this.getTheme().trackOnColor
      },
      thumbWhenSwitched: {
        backgroundColor: this.getTheme().thumbOnColor,
        left: '100%'
      },
      trackWhenDisabled: {
        backgroundColor: this.getTheme().trackDisabledColor
      },
      thumbWhenDisabled: {
        backgroundColor: this.getTheme().thumbDisabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onToggle = _props.onToggle;

    var other = _objectWithoutProperties(_props, ['onToggle']);

    var styles = this.getStyles();

    var trackStyles = this.mergeAndPrefix(styles.track, this.props.trackStyle, this.state.switched && styles.trackWhenSwitched, this.props.disabled && styles.trackWhenDisabled);

    var thumbStyles = this.mergeAndPrefix(styles.thumb, this.props.thumbStyle, this.state.switched && styles.thumbWhenSwitched, this.props.disabled && styles.thumbWhenDisabled);

    if (this.state.switched) {
      thumbStyles.marginLeft = '-' + thumbStyles.width;
    }

    var toggleElementStyles = this.mergeAndPrefix(styles.toggleElement, this.props.elementStyle);

    var toggleElement = React.createElement(
      'div',
      { style: toggleElementStyles },
      React.createElement('div', { style: trackStyles }),
      React.createElement(Paper, { style: thumbStyles, circle: true, zDepth: 1 })
    );

    var customRippleStyle = this.mergeAndPrefix({
      top: -10,
      left: -10
    }, this.props.rippleStyle);

    var rippleColor = this.state.switched ? this.getTheme().thumbOnColor : this.context.muiTheme.component.textColor;

    var iconStyle = this.mergeAndPrefix(styles.icon, this.props.iconStyle);

    var labelStyle = this.mergeAndPrefix(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'checkbox',
      switchElement: toggleElement,
      rippleStyle: customRippleStyle,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      trackStyle: trackStyles,
      thumbStyle: thumbStyles,
      labelStyle: labelStyle,
      switched: this.state.switched,
      onSwitch: this._handleToggle,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : 'left'
    };

    if (this.props.hasOwnProperty('toggled')) enhancedSwitchProps.checked = this.props.toggled;

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  isToggled: function isToggled() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function setToggled(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function _handleToggle(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  },

  _handleStateChange: function _handleStateChange(newSwitched) {
    this.setState({ switched: newSwitched });
  }

});

module.exports = Toggle;