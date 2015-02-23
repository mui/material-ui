var React = require('react');
var Paper = require('./paper');
var Classable = require('./mixins/classable');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButton = require('./radio-button');

var RadioButtonGroup = React.createClass({

	mixins: [Classable],

	propTypes: {
		name: React.PropTypes.string.isRequired,
    valueSelected: React.PropTypes.string,
    defaultSelected: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
		onChange: React.PropTypes.func
	},

  _hasCheckAttribute: function(radioButton) {
    return radioButton.props.hasOwnProperty('checked') && 
      radioButton.props.checked; 
  },

  getInitialState: function() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
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
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
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
        labelPosition={this.props.labelPosition}
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
    } else if (process.NODE_ENV !== 'production') {
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
  },

  clearValue: function() {
    this.setSelectedValue('');  
  }

});

module.exports = RadioButtonGroup;
