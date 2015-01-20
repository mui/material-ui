var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');

var EnhancedSwitch = React.createClass({
	propTypes: {
      switchType: React.PropTypes.string.isRequired,
	    className: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string.isRequired,
	    label: React.PropTypes.string,
	    onSwitch: React.PropTypes.func,
	    required: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    defaultSwitched: React.PropTypes.bool
	  },

  mixins: [Classable],

  getInitialState: function() {
    return {
      switched: this.props.defaultSwitched || false
    }
  },

  componentDidMount: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({switched: inputNode.checked});
  },

  componentWillReceiveProps: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({switched: inputNode.checked});
  },

  handleChange: function(e) {
    var isInputChecked = this.refs.checkbox.getDOMNode().checked;

    if (!this.props.hasOwnProperty('checked')) this.setState({switched: isInputChecked});
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  render: function() {
    var classes = this.getClasses(this.props.className, {
      'mui-is-switched': this.state.switched,
      'mui-is-disabled': this.props.disabled,
      'mui-is-required': this.props.required
    });

    var {
      type,
      name,
      value,
      label,
      onSwitch,
      ...other
    } = this.props;

    return (
      <input 
          {...other} 
          ref="checkbox"
          type="checkbox"
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}/>
    );
  },


  isSwitched: function() {
    return this.refs.checkbox.getDOMNode().checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked')) {
      this.setState({toggled: newSwitchedValue});  
      this.refs.checkbox.getDOMNode().checked = newSwitchedValue;
    } else {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  }
});

module.exports = EnhancedSwitch;
