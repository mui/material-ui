var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Toggle = React.createClass({

  propTypes: {
    onToggle: React.PropTypes.func,
    defaultToggled: React.PropTypes.bool
  },

  render: function() {
    var {
      onToggle,
      defaultToggled,
      ...other
    } = this.props;

    return (
      <EnhancedSwitch 
        {...other} 
        ref="enhancedSwitch"
        switchType="toggle"
        className="mui-switch-toggle"
        onSwitch={this.props.onToggle}
        defaultChecked={this.props.defaultToggled} />
    );
  },

  isToggled: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setToggled: function(newToggledValue) {
    this.refs.enhancedSwitch.setSwitched(newToggledValue);
  }

});

module.exports = Toggle;