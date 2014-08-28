/**
 * @jsx React.DOM
 */

var React = require('react'),
	Classable = require('./mixins/classable.js');

var Icon = React.createClass({

	mixins: [Classable],

	propTypes: {
		icon: React.PropTypes.string
	},

	render: function() {
		var classes = this.getClasses('mui-icon-' + this.props.icon);

		return (
			<span className={classes}>
				{this.props.children}
			</span>
		);
	}

});

module.exports = Icon;