/**
 * @jsx React.DOM
 */

var React = require('react'),
	Paper = require('../../../material-ui/js/paper.jsx'),
	CodeBlock = require('./code-block.jsx');

var CodeExample = React.createClass({

	propTypes: {
		code: React.PropTypes.string.isRequired
	},

	render: function() {
		return (
			<Paper className="code-example">
    		<div className="example-label">example</div>
	    	<div className="example-block">
	    		{this.props.children}
	    	</div>
	    	<CodeBlock>{this.props.code}</CodeBlock>
    	</Paper>
		);
	}

});

module.exports = CodeExample;