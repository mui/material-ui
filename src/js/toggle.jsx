var React = require('react');
var Paper = require('./paper.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Toggle = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    toggled: React.PropTypes.bool,
    defaultToggled: React.PropTypes.bool
  },

  render: function() {
    var {
      onToggle,
      ...other
    } = this.props;

    var toggleElement = (
      <div>
        <div className="mui-toggle-track" />
        <Paper className="mui-toggle-thumb" zDepth={1}/>
      </div>
    );

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switchElement: toggleElement,
      className: "mui-toggle",
      onSwitch: this._handleToggle,
      defaultSwitched: this.props.defaultToggled,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "left"
    };

    if (this.props.toggled) enhancedSwitchProps.checked = this.props.toggled;

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  },

  _handleToggle: function(e, isInputChecked) {
    if (this.props.onToggle) this.props.onToggle(e, isInputChecked);
  }
});

module.exports = Toggle;
