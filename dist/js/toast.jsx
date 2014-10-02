/**
 * @jsx React.DOM
 */

var React = require('react');
var Classable = require('./mixins/classable.js');

var Toast = React.createClass({

	mixins: [Classable],

	propTypes: {
		action: React.PropTypes.string,
		icon: React.PropTypes.string,
		message: React.PropTypes.string,
    	onClick: React.PropTypes.func
	},

	getInitialState: function() {
		return {
			open: false
		}
	},

	render: function() {
	    var classes = this.getClasses('mui-toast', {
      		'mui-open': this.state.open
	    }),
	    	message,
	    	action;

	    if (this.props.message) message = <span className="mui-toast-message">{this.props.message}</span>;
	    if (this.props.action) action = <span className="mui-toast-action" onClick={this._onActionClick}>{this.props.action}</span>;

		return (
			<span className={classes}>
          		{message}
          		{action}
          	</span>
		);
	},

	_onActionClick: function(e) {
		if (this.props.onClick) this.props.onClick(e, this.props.action);

		if (this.props.action === 'retry') {

		}
		else {
			this.setState({ open: false });
		}
		
	},

	toggle: function(e) {
		this.setState({ open: !this.state.open });
		console.log(!this.state.open);
	}

});

module.exports = Toast;