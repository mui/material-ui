'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	propTypes: {
		theme: React.PropTypes.object.isRequired
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext: function getChildContext() {
		return {
			muiTheme: this.props.theme
		};
	},

	render: function render() {
		return this.props.children();
	}
});