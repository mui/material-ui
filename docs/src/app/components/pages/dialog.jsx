/**
 * @jsx React.DOM
 */

var CodeExample = require('../code-example/code-example.jsx');
var mui = require('mui');
var React = require('react');


var DialogExample = React.createClass({

	render: function() {
		var code = 
      "showDialog: function() {\n" +
      "  this.refs.dialogExample.show();\n" +
      "},\n\n" +
      "render: function() {\n\n" +
      "  var dialogActions = [\n" +
      "    { text: 'CANCEL' },\n" +
      "    { text: 'SUBMIT', onClick: this._onDialogSubmit }\n" +
      "  ];\n\n" +
      "  return (\n" +
      "    <PaperButton label=\"DEMO\" onClick={this.showDialog} />\n" +
      "    <Dialog ref=\"dialogExample\" title=\"Title\" actions={dialogActions} />\n" +
      "  );\n" +
      "}\n";

		var	dialogActions = [
			{ text: 'CANCEL' },
			{ text: 'SUBMIT', onClick: this._onDialogSubmit }
		];

		return (
			<div>
    		<h2 className="mui-font-style-headline">Drop Down Menu</h2>
    		<CodeExample code={code}>
    			<mui.PaperButton label="DEMO" onClick={this.showDialog} />
    		</CodeExample>
    		<mui.Dialog ref="dialogExample" title="Title" actions={dialogActions}>
    			This is an example of a dialog component built with Facebook's React and following 
    			Google's Material Design principles.
  			</mui.Dialog>
  		</div>
		);
	},

	showDialog: function() {
		this.refs.dialogExample.show();
	}

});

module.exports = DialogExample;