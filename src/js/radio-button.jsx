var React = require('react');
var StylePropable = require('./mixins/style-propable.js');
var Transitions = require('./styles/mixins/transitions.js');
var CustomVariables = require('./styles/custom-variables.js');
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
    var styles = this.mergePropStyles({
      icon: {
        height: radioButtonSize,
        width: radioButtonSize
      },
      target: {
        transition: Transitions.easeOut(),
        position: 'absolute',
        opacity: this.props.checked ? 0 : 
                 this.props.disabled ? 0.3 : 1,
        transform: this.props.checked ? 'scale(0)' : 'scale(1)',
        fill: this.props.disabled ? 
          CustomVariables.radioButtonDisabledColor : CustomVariables.radioButtonBorderColor,
      },
      fill: {
        position: 'absolute',
        opacity: this.props.checked ? 1 : 
                 this.props.disabled ? 0.3 : 1,
        transform: this.props.checked ? 'scale(1)' : 'scale(0)',
        transformOrigin: '50% 50%',
        transition: Transitions.easeOut(),
        fill: this.props.disabled ? 
          CustomVariables.radioButtonDisabledColor : CustomVariables.radioButtonCheckedColor
      }
    });

    if (this.props.checked && this.props.disabled) {
      styles.target.opacity = 0.3;
      styles.fill.opacity = 0.3;
    }

    var radioButtonElement = (
      <div>
          <RadioButtonOff style={styles.target} />
          <RadioButtonOn style={styles.fill} />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked,
      switchElement: radioButtonElement,
      iconStyle: styles,
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
