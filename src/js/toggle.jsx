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
          switchType="toggle" 
          onSwitch={this.props.onToggle}
          defaultSwitched={this.props.defaultToggled} />
    );
  }
});

module.exports = Toggle;