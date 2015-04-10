var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

var RadioButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    onCheck: React.PropTypes.func
  },

  getTheme: function() {
    return this.context.theme.radioButton;
  },

  render: function() {

    var {
      onCheck,
      ...other
    } = this.props;

    var iconStyles = {
        height: this.getTheme().size,
        width: this.getTheme().size
    };
    var targetStyles = {
        transition: Transitions.easeOut(),
        position: 'absolute',
        opacity: 1,
        transform: 'scale(1)',
        fill: this.getTheme().borderColor
    };
    var fillStyles = {
        position: 'absolute',
        opacity: 1,
        transform: 'scale(0)',
        transformOrigin: '50% 50%',
        transition: Transitions.easeOut(),
        fill: this.getTheme().checkedColor
    };

    if (this.props.checked) {
      targetStyles = this.mergeStyles(targetStyles, {
        opacity: 0,
        transform: 'scale(0)'
      });
      fillStyles = this.mergeStyles(fillStyles, {
        opacity: 1,
        transform: 'scale(1)'
      });
    }

    if (this.props.disabled) {
      targetStyles.fill = this.getTheme().disabledColor;
      fillStyles.fill = this.getTheme().disabledColor;
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
