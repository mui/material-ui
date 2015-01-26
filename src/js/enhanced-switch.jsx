var React = require('react');
var Classable = require('./mixins/classable.js');
var Paper = require('./paper.jsx');

var EnhancedSwitch = React.createClass({
	propTypes: {
      inputType: React.PropTypes.string.isRequired,
      name: React.PropTypes.string,
	    value: React.PropTypes.string,
	    label: React.PropTypes.string,
	    onSwitch: React.PropTypes.func,
	    required: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    defaultSwitched: React.PropTypes.bool
	  },

  getInitialState: function() {
    return {
      switched: this.props.defaultSwitched ||
        (this.props.valueLink && this.props.valueLink.value)
    }
  },

  componentDidMount: function() {
    var inputNode = this.refs.checkbox.getDOMNode();
    this.setState({switched: inputNode.checked});
  },

  componentWillReceiveProps: function(nextProps) {
    var hasCheckedLinkProp = nextProps.hasOwnProperty('checkedLink');
    var hasCheckedProp = nextProps.hasOwnProperty('checked');
    var hasNewDefaultProp = 
      (nextProps.hasOwnProperty('defaultSwitched') && 
      (nextProps.defaultSwitched != this.props.defaultSwitched));
    var newState = {};


    if (hasCheckedProp) {
      newState.switched = nextProps.checked;
    } else if (hasCheckedLinkProp) {
      newState.switched = nextProps.checkedLink.value;
    } else if (hasNewDefaultProp) {
      newState.switched = nextProps.defaultSwitched;
    }

    if (newState) this.setState(newState);
  },

  render: function() {
    var {
      type,
      name,
      value,
      label,
      onSwitch,
      ...other
    } = this.props;

    var inputProps;

    inputProps = {
      ref: "checkbox",
      type: this.props.inputType,
      name: this.props.name,
      value: this.props.value,
    };

    if (!this.props.hasOwnProperty('checkedLink')) {
      inputProps.onChange = this._handleChange;
    }

    return (
      <input 
        {...other} 
        {...inputProps}
        className="mui-enhanced-switch"/>
    );
  },


  isSwitched: function() {
    return this.refs.checkbox.getDOMNode().checked;
  },

  // no callback here because there is no event
  setSwitched: function(newSwitchedValue) {
    if (!this.props.hasOwnProperty('checked') || this.props.checked == false) {
      this.setState({switched: newSwitchedValue});  
      this.refs.checkbox.getDOMNode().checked = newSwitchedValue;
    } else {
      var message = 'Cannot call set method while checked is defined as a property.';
      console.error(message);
    }
  },

  _handleChange: function(e) {
    var isInputChecked = this.refs.checkbox.getDOMNode().checked;

    if (!this.props.hasOwnProperty('checked')) this.setState({switched: isInputChecked});
    if (this.props.onSwitch) this.props.onSwitch(e, isInputChecked);
  },

  getValue: function() {
    return this.refs.checkbox.getDOMNode().value;
  }

});

module.exports = EnhancedSwitch;
