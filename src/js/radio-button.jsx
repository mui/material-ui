var React = require('react');
var StylePropable = require('./mixins/style-propable.js');
var Transitions = require('./styles/mixins/transitions.js');
var CustomVariables = require('./styles/variables/custom-variables.js');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

var RadioButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    onCheck: React.PropTypes.func
  },

  render: function() {

    var {
      onCheck,
      ...other
    } = this.props;

    var radioButtonSize = 24;
    var iconStyles = {
        height: radioButtonSize,
        width: radioButtonSize
    };
    var targetStyles = {
        transition: Transitions.easeOut(),
        position: 'absolute',
        opacity: 1,
        transform: 'scale(1)',
        fill: CustomVariables.radioButtonBorderColor
    };
    var fillStyles = {
        position: 'absolute',
        opacity: 1,
        transform: 'scale(0)',
        transformOrigin: '50% 50%',
        transition: Transitions.easeOut(),
        fill: CustomVariables.radioButtonCheckedColor
    };

    if (this.props.checked) {
      targetStyles = this.mergePropStyles(targetStyles, {
        opacity: 0,
        transform: 'scale(0)'
      });
      fillStyles = this.mergePropStyles(fillStyles, {
        opacity: 1,
        transform: 'scale(1)'
      });
    }

    if (this.props.disabled) {
      targetStyles = this.mergePropStyles(targetStyles, {
        opacity: 0.3,
        fill: CustomVariables.radioButtonDisabledColor
      });
      fillStyles = this.mergePropStyles(fillStyles, {
        opacity: 0.3,
        fill: CustomVariables.radioButtonDisabledColor
      });
    }

    if (this.props.checked && this.props.disabled) {
      targetStyles.opacity = 0.3;
      fillStyles.opacity = 0.3;
    }

    var radioButtonElement = (
      <div>
          <RadioButtonOff style={targetStyles} />
          <RadioButtonOn style={fillStyles} />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked,
      switchElement: radioButtonElement,
      iconStyle: iconStyles,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  // Only called when selected, not when unselected.
  _handleCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function(newSwitched) {
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a 
  // RadioButton's checked value.
  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }

});

module.exports = RadioButton;
