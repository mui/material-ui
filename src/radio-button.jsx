import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import EnhancedSwitch from './enhanced-switch';
import RadioButtonOff from './svg-icons/toggle/radio-button-unchecked';
import RadioButtonOn from './svg-icons/toggle/radio-button-checked';
import getMuiTheme from './styles/getMuiTheme';

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.radioButton;
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

    let styles = this.getStyles();
    let onStyles =
      this.mergeStyles(
        styles.target,
        this.props.checked && styles.targetWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.targetWhenDisabled);
    let offStyles =
      this.mergeStyles(
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

    let iconStyle = this.mergeStyles(
      styles.icon,
      this.props.iconStyle
    );

    let labelStyle = this.mergeStyles(
      styles.label,
      this.props.labelStyle
    );

    let enhancedSwitchProps = {
      ref: 'enhancedSwitch',
      inputType: 'radio',
      switched: this.props.checked,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
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
