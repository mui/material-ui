let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let EnhancedSwitch = require('./enhanced-switch');
let RadioButtonOff = require('./svg-icons/toggle/radio-button-unchecked');
let RadioButtonOn = require('./svg-icons/toggle/radio-button-checked');


let RadioButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func,
  },

  getTheme() {
    return this.context.muiTheme.component.radioButton;
  },

  getStyles() {
    let styles = {
      icon: {
          height: this.getTheme().size,
          width: this.getTheme().size,
      },
      target: {
          transition: Transitions.easeOut(),
          position: 'absolute',
          opacity: 1,
          transform: 'scale(1)',
          fill: this.getTheme().borderColor,
      },
      fill: {
          position: 'absolute',
          opacity: 1,
          transform: 'scale(0)',
          transformOrigin: '50% 50%',
          transition: Transitions.easeOut(),
          fill: this.getTheme().checkedColor,
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
        fill: this.getTheme().disabledColor,
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor,
      },
      label: {
        color: this.props.disabled ? this.getTheme().labelDisabledColor : this.getTheme().labelColor,
      },
    };

    return styles;
  },

  render() {
    let {
      onCheck,
      ...other,
    } = this.props;

    let styles = this.getStyles();
    let onStyles =
      this.mergeAndPrefix(
        styles.target,
        this.props.checked && styles.targetWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.targetWhenDisabled);
    let offStyles =
      this.mergeAndPrefix(
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

    let rippleColor = this.props.checked ? this.getTheme().checkedColor : this.getTheme().borderColor;

    let iconStyle = this.mergeAndPrefix(
      styles.icon,
      this.props.iconStyle
    );

    let labelStyle = this.mergeAndPrefix(
      styles.label,
      this.props.labelStyle
    );

    let enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked || false,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
      iconStyle: iconStyle,
      labelStyle: labelStyle,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right",
    };

    return (
      <EnhancedSwitch
        {...other}
        {...enhancedSwitchProps}/>
    );
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

});

module.exports = RadioButton;
