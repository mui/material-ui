var React = require('react'),
	mui = require('mui'),
	CodeBlock = require('./code-block.jsx');

var CodeExample = React.createClass({

	propTypes: {
		code: React.PropTypes.string.isRequired
	},

	render: function() {
		return (
			<mui.Paper className="code-example">
    		<div className="example-label">example</div>
	    	<div className="example-block">
	    		{this.props.children}
	    	</div>
	    	<CodeBlock>{this.props.code}</CodeBlock>
    	</mui.Paper>
		);
	}

});

module.exports = CodeExample;