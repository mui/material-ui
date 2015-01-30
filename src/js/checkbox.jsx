var React = require('react');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank.jsx');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked.jsx');

var Checkbox = React.createClass({

  propTypes: {
    onCheck: React.PropTypes.func,
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    var checkboxElement = (
      <div>
        <CheckboxOutline className="mui-checkbox-box" />
        <CheckboxChecked className="mui-checkbox-check" />
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: checkboxElement,
      className: "mui-checkbox",
      onSwitch: this._handleCheck,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  }
});

module.exports = Checkbox;
