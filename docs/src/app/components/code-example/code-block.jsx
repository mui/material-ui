var React = require('react'),
	hljs = require('highlight.js');

var CodeBlock = React.createClass({

	componentDidMount: function() {
		hljs.highlightBlock(this.getDOMNode());
	},

	componentDidUpdate: function(prevProps, prevState) {
		hljs.highlightBlock(this.getDOMNode());
	},

	render: function() {
		return (
			<pre className="code-block">
				<code>{this.props.children}</code>
			</pre>
		);
	}

});

module.exports = CodeBlock;
