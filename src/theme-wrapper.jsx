const React = require('react');

module.exports = React.createClass({
	propTypes: {
		theme: React.PropTypes.object.isRequired,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object,
	},

	getChildContext() {
		return {
			muiTheme: this.props.theme,
		};
	},

	render() {
		return this.props.children();
	},
});
