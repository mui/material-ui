/**
 * @jsx React.DOM
 */

var React = require('react'),
	Classable = require('./mixins/classable.js');

var Icon = React.createClass({

	mixins: [Classable],

	propTypes: {
		icon: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
  	return {
  		classes: 'mui-icon-' + this.props.icon
  	}
  },

	render: function() {
		return (
			<span className={this.state.mergedClasses}>
				{this.props.children}
			</span>
		);
	}

});

module.exports = Icon;