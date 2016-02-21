import React from 'react';
import Transitions from './styles/transitions';
import EnhancedSwitch from './enhanced-switch';
import RadioButtonOff from './svg-icons/toggle/radio-button-unchecked';
import RadioButtonOn from './svg-icons/toggle/radio-button-checked';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    radioButton,
  } = state.muiTheme;

  return {
    icon: {
      height: radioButton.size,
      width: radioButton.size,
    },
    target: {
      transition: Transitions.easeOut(),
      position: 'absolute',
      opacity: 1,
      transform: 'scale(1)',
      fill: radioButton.borderColor,
    },
    fill: {
      position: 'absolute',
      opacity: 1,
      transform: 'scale(0)',
      transformOrigin: '50% 50%',
      transition: Transitions.easeOut(),
      fill: radioButton.checkedColor,
    },
    targetWhenChecked: {
      opacity: 0,
      transform: 'scale(0)',
    },
    fillWhenChecked: {
      opacity: 1,
      transform: 'scale(1)',
    },
    targetWhenDisabled: {
      fill: radioButton.disabledColor,
    },
    fillWhenDisabled: {
      fill: radioButton.disabledColor,
    },
    label: {
      color: props.disabled ? radioButton.labelDisabledColor : radioButton.labelColor,
    },
    ripple: {
      color: props.checked ? radioButton.checkedColor : radioButton.borderColor,
    },
  };
}

const RadioButton = React.createClass({

  propTypes: {
    /**
     * @ignore
     * checked if true
     * Used internally by `RadioButtonGroup`.
     */
    checked: React.PropTypes.bool,

    /**
     * The icon element to show when radio button is checked.
     */
    checkedIcon: React.PropTypes.element,

    /**
     * Disabled if true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Overrides the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
    * Overrides the inline-styles of the input element.
    */
    inputStyle: React.PropTypes.object,

    /**
     * @ignore
     * Used internally by `RadioButtonGroup`. Use the `labelPosition` property of `RadioButtonGroup` instead.
     * Where the label will be placed next to the radio button.
     */
    labelPosition: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Overrides the inline-styles of the RadioButton element label.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Callback function for checked event.
     */
    onCheck: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The icon element to show when radio button is unchecked.
     */
    uncheckedIcon: React.PropTypes.element,

    /**
     * The value of our radio button component.
     */
    value: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      checked: false,
      disabled: false,
      labelPosition: 'right',
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  getTheme() {
    return this.state.muiTheme.radioButton;
  },

  // Only called when selected, not when unselected.
  _handleCheck(event) {
    if (this.props.onCheck) this.props.onCheck(event, this.props.value);
  },

  _handleStateChange() {
  },

  isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a
  // RadioButton's checked value.
  setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  getValue() {
    return this.refs.enhancedSwitch.getValue();
  },

  render() {
    const {
      checkedIcon,
      checked,
      iconStyle,
      labelStyle,
      labelPosition,
      onCheck,
      uncheckedIcon,
      disabled,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    const uncheckedStyles = Object.assign(
      styles.target,
      checked && styles.targetWhenChecked,
      iconStyle,
      disabled && styles.targetWhenDisabled
    );

    const checkedStyles = Object.assign(
      styles.fill,
      checked && styles.fillWhenChecked,
      iconStyle,
      disabled && styles.fillWhenDisabled
    );

    const uncheckedElement = React.isValidElement(uncheckedIcon)
      ? React.cloneElement(uncheckedIcon, {style: Object.assign(uncheckedStyles, uncheckedIcon.props.style)})
      : <RadioButtonOff style={uncheckedStyles} />;

    const checkedElement = React.isValidElement(checkedIcon)
      ? React.cloneElement(checkedIcon, {style: Object.assign(checkedStyles, checkedIcon.props.style)})
      : <RadioButtonOn style={checkedStyles} />;

    const mergedIconStyle = Object.assign(styles.icon, iconStyle);
    const mergedLabelStyle = Object.assign(styles.label, labelStyle);

    return (
      <EnhancedSwitch
        {...other}
        ref="enhancedSwitch"
        inputType="radio"
        checked={checked}
        switched={checked}
        disabled={disabled}
        rippleColor={styles.ripple.color}
        iconStyle={mergedIconStyle}
        labelStyle={mergedLabelStyle}
        labelPosition={labelPosition}
        onSwitch={this._handleCheck}
        onParentShouldUpdate={this._handleStateChange}
        switchElement={<div>{uncheckedElement}{checkedElement}</div>}
      />
    );
  },

});

export default RadioButton;
