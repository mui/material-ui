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
     * Used internally by `RadioButtonGroup`.
     */
    /* Checked if true. */
    checked: React.PropTypes.bool,

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
     * Used internally by `RadioButtonGroup`. Use the `labelPosition` property of `RadioButtonGroup` instead.
     */
    /* Where the label will be placed next to the radio button. */
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
  _handleCheck(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
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
    let {
      onCheck,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.state);

    let onStyles =
      Object.assign(
        styles.target,
        this.props.checked && styles.targetWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.targetWhenDisabled);
    let offStyles =
      Object.assign(
        styles.fill,
        this.props.checked && styles.fillWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.fillWhenDisabled);

    let radioButtonElement = (
      <div>
        <RadioButtonOff style={onStyles} />
        <RadioButtonOn style={offStyles} />
      </div>
    );

    const iconStyle = Object.assign(
      styles.icon,
      this.props.iconStyle
    );

    const labelStyle = Object.assign(
      styles.label,
      this.props.labelStyle
    );

    let enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'radio',
      switched: this.props.checked,
      switchElement: radioButtonElement,
      rippleColor: styles.ripple.color,
      iconStyle: iconStyle,
      labelStyle: labelStyle,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: this.props.labelPosition,
    };

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}
      />
    );
  },

});

export default RadioButton;
