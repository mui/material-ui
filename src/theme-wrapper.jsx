const React = require('react');

module.exports = class extends React.Component {
    getChildContext() {
		return {
			muiTheme: this.props.theme,
		};
	}

    render() {
		return this.props.children();
	}
};

module.exports.propTypes = {
    theme: React.PropTypes.object.isRequired,
};

module.exports.childContextTypes = {
    muiTheme: React.PropTypes.object,
};
