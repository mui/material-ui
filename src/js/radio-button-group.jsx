var React = require('react');
var Paper = require('./paper.jsx');
var Classable = require('./mixins/classable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var RadioButton = require('./radio-button.jsx');

var RadioButtonGroup = React.createClass({

	mixins: [Classable],

	propTypes: {
		name: React.PropTypes.string.isRequired,
    defaultSelected: React.PropTypes.string,
		onChange: React.PropTypes.func
	},

  _hasCheckAttribute: function(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && 
      radioButton.props.checked; 
  },

  getInitialState: function() {
    var initialSelection = '';
    
    if (this.props.hasOwnProperty('defaultSelected')) {
      initialSelection = this.props.defaultSelected;
    } else {
      this.props.children.forEach(function(option) {
        if (this._hasCheckAttribute(option) || option.props.defaultChecked) initialSelection = option.props.value;
      }, this);
    }

    return {
      numberCheckedRadioButtons: 0,
      selected: initialSelection
    };
  },

  componentWillMount: function() {
    var cnt = 0;
    
    this.props.children.forEach(function(option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  }, 

  componentWillReceiveProps: function(nextProps) {
    var newSelection = '';
    
    nextProps.children.forEach(function(option) {
      if (this._hasCheckAttribute(option) || option.props.defaultChecked) newSelection = option.props.value;
    }, this);

    this.setState({selected: newSelection});
  },

	render: function() {
    var options = this.props.children.map(function(option) {
      
      var {
        name,
        value,
        label,
        onCheck,
        ...other
      } = option.props;

      return <RadioButton
        {...other}
        ref={option.props.value}
        name={this.props.name}
        key={option.props.value}
        value={option.props.value}
        label={option.props.label}
        onCheck={this._onChange}
        checked={option.props.value == this.state.selected}/>

		}, this);

		return (
			<div>
				{options}
			</div>
		);
	},

  _updateRadioButtons: function(newSelection) {
    if (this.state.numberCheckedRadioButtons == 0) {
      
      this.setState({selected: newSelection});

    } else {
        var message = "Cannot select a different radio button while another radio button " + 
                      "has the 'checked' property set to true.";
        console.error(message);
    }
  },

	_onChange: function(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
	},

  getSelectedValue: function() {
    return this.state.selected;
  },

  setSelectedValue: function(newSelection) {
    this._updateRadioButtons(newSelection);  
  }
});

module.exports = RadioButtonGroup;
