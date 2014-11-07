/**
 * @jsx React.DOM
 */

var React = require('react'),
	Classable = require('./mixins/classable.js');

var Icon = React.createClass({

	mixins: [Classable],

	propTypes: {
		icon: React.PropTypes.string,
		onClick: React.PropTypes.func
	},

	render: function() {
		var classes = this.getClasses('mui-icon mdfi_' + this.props.icon.replace(/-/g, '_'));

		return (
			<span className={classes} onClick={this._onClick}>
				<span className="mui-icon-highlight">&nbsp;</span>
			</span>
		);
	},

	_onClick: function(e) {
		if (this.props.onClick) this.props.onClick(e);
	}

});

module.exports = Icon;
