'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle/radio-button-unchecked');
var RadioButtonOn = require('./svg-icons/toggle/radio-button-checked');

var RadioButton = React.createClass({
  displayName: 'RadioButton',

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func
  },

  getTheme: function getTheme() {
    return this.context.muiTheme.component.radioButton;
  },

  getStyles: function getStyles() {
    var styles = {
      icon: {
        height: this.getTheme().size,
        width: this.getTheme().size
      },
      target: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        opacity: 1,
        transform: 'scale(1)',
        fill: this.getTheme().borderColor
      },
      fill: {
        position: 'absolute',
        opacity: 1,
        transform: 'scale(0)',
        transformOrigin: '50% 50%',
        transition: Transitions.easeOut(),
        fill: this.getTheme().checkedColor
      },
      targetWhenChecked: {
        opacity: 0,
        transform: 'scale(0)'
      },
      fillWhenChecked: {
        opacity: 1,
        transform: 'scale(1)'
      },
      targetWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor
      }
    };

    return styles;
  },

  render: function render() {
    var _props = this.props;
    var onCheck = _props.onCheck;

    var other = _objectWithoutProperties(_props, ['onCheck']);

    var styles = this.getStyles();
    var onStyles = this.mergeAndPrefix(styles.target, this.props.checked && styles.targetWhenChecked, this.props.iconStyle, this.props.disabled && styles.targetWhenDisabled);
    var offStyles = this.mergeAndPrefix(styles.fill, this.props.checked && styles.fillWhenChecked, this.props.iconStyle, this.props.disabled && styles.fillWhenDisabled);

    var radioButtonElement = React.createElement(
      'div',
      null,
      React.createElement(RadioButtonOff, { style: onStyles }),
      React.createElement(RadioButtonOn, { style: offStyles })
    );

    var rippleColor = this.props.checked ? this.getTheme().checkedColor : this.getTheme().borderColor;

    var iconStyle = this.mergeAndPrefix(styles.icon, this.props.iconStyle);

    var labelStyle = this.mergeAndPrefix(styles.label, this.props.labelStyle);

    var enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'radio',
      switched: this.props.checked || false,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      labelStyle: labelStyle,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: this.props.labelPosition ? this.props.labelPosition : 'right'
    };

    return React.createElement(EnhancedSwitch, _extends({}, other, enhancedSwitchProps));
  },

  // Only called when selected, not when unselected.
  _handleCheck: function _handleCheck(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function _handleStateChange() {},

  isChecked: function isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a
  // RadioButton's checked value.
  setChecked: function setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  getValue: function getValue() {
    return this.refs.enhancedSwitch.getValue();
  }

});

module.exports = RadioButton;