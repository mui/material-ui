var React = require('react');
var Classable = require('./mixins/classable.js');
var Icon = require('./icon.jsx');
var EnhancedSwitch = require('./enhanced-switch.jsx');

var Checkbox = React.createClass({

  propTypes: {
    onCheck: React.PropTypes.func,
    defaultChecked: React.PropTypes.bool
  },

  render: function() {
    var {
      onCheck,
      ...other
    } = this.props;

    return (
        <EnhancedSwitch 
          {...other}
          ref="enhancedSwitch"
          switchType="checkbox"
          className="mui-switch-checkbox"
          onSwitch={this.props.onCheck}
          defaultSwitched={this.props.defaultChecked} />
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  }

});

module.exports = Checkbox;