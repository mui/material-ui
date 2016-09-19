import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import EnhancedSwitch from '../internal/EnhancedSwitch';
import RadioButtonOff from '../svg-icons/toggle/radio-button-unchecked';
import RadioButtonOn from '../svg-icons/toggle/radio-button-checked';

function getStyles(props, context) {
  const {radioButton} = context.muiTheme;

  return {
    icon: {
      height: radioButton.size,
      width: radioButton.size,
    },
    target: {
      transition: transitions.easeOut(),
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
      transition: transitions.easeOut(),
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
      cursor: 'not-allowed',
    },
    fillWhenDisabled: {
      fill: radioButton.disabledColor,
      cursor: 'not-allowed',
    },
    label: {
      color: props.disabled ? radioButton.labelDisabledColor : radioButton.labelColor,
    },
    ripple: {
      color: props.checked ? radioButton.checkedColor : radioButton.borderColor,
    },
  };
}

class RadioButton extends Component {
  static propTypes = {
    /**
     * @ignore
     * checked if true
     * Used internally by `RadioButtonGroup`.
     */
    checked: PropTypes.bool,
    /**
     * The icon element to show when the radio button is checked.
     */
    checkedIcon: PropTypes.element,
    /**
     * If true, the radio button is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * Override the inline-styles of the input element.
     */
    inputStyle: PropTypes.object,
    /**
     * @ignore
     * Used internally by `RadioButtonGroup`. Use the `labelPosition` property of `RadioButtonGroup` instead.
     * Where the label will be placed next to the radio button.
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Override the inline-styles of the label element.
     */
    labelStyle: PropTypes.object,
    /**
     * @ignore
     * Callback function fired when the radio button is checked. Note that this
     * function will not be called if the radio button is part of a
     * radio button group: in this case, use the `onChange` property of
     * `RadioButtonGroup`.
     *
     * @param {object} event `change` event targeting the element.
     * @param {string} value The element's `value`.
     */
    onCheck: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The icon element to show when the radio button is unchecked.
     */
    uncheckedIcon: PropTypes.element,
    /**
     * The value of the radio button.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    labelPosition: 'right',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  // Only called when selected, not when unselected.
  handleSwitch = (event) => {
    if (this.props.onCheck) {
      this.props.onCheck(event, this.props.value);
    }
  };

  isChecked() {
    return this.refs.enhancedSwitch.isSwitched();
  }

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a
  // RadioButton's checked value.
  setChecked(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  }

  getValue() {
    return this.refs.enhancedSwitch.getValue();
  }

  render() {
    const {
      checkedIcon,
      checked,
      iconStyle,
      labelStyle,
      labelPosition,
      onCheck, // eslint-disable-line no-unused-vars
      uncheckedIcon,
      disabled,
      ...other,
    } = this.props;

    const styles = getStyles(this.props, this.context);

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

    const uncheckedElement = React.isValidElement(uncheckedIcon) ?
      React.cloneElement(uncheckedIcon, {
        style: Object.assign(uncheckedStyles, uncheckedIcon.props.style),
      }) :
      <RadioButtonOff style={uncheckedStyles} />;

    const checkedElement = React.isValidElement(checkedIcon) ?
      React.cloneElement(checkedIcon, {
        style: Object.assign(checkedStyles, checkedIcon.props.style),
      }) :
      <RadioButtonOn style={checkedStyles} />;

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
        onSwitch={this.handleSwitch}
        switchElement={<div>{uncheckedElement}{checkedElement}</div>}
      />
    );
  }
}

export default RadioButton;
