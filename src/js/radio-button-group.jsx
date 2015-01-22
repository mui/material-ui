var React = require('react');
var Paper = require('./paper.jsx');
var Classable = require('./mixins/classable.js');
var EnhancedSwitch = require('./enhanced-switch.jsx');
var RadioButton = require('./radio-button.jsx');

var RadioButtonGroup = React.createClass({

	mixins: [Classable],

	propTypes: {
		name: React.PropTypes.string.isRequired,
		options: React.PropTypes.array,
		onChange: React.PropTypes.func
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
        onCheck={this._onChange} />
		}, this);

		return (
			<div>
				{options}
			</div>
		);
	},

	_onChange: function(e, selected) {
    this.props.children.forEach(function(option) {
      this.refs[option.props.value].setChecked(selected == option.props.value);
    }, this);

    if (this.props.onChange) this.props.onChange(e, selected);
	}

});

module.exports = RadioButtonGroup;
