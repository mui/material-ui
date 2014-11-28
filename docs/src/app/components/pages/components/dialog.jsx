var React = require('react'),
  mui = require('mui'),
  RaisedButton = mui.RaisedButton,
  Dialog = mui.Dialog,
  CodeExample = require('../../code-example/code-example.jsx');




var DialogExample = React.createClass({

	render: function() {
		var code = 
      "_showDialog: function() {\n" +
      "  this.refs.dialogExample.show();\n" +
      "},\n\n" +
      "render: function() {\n\n" +
      "  var dialogActions = [\n" +
      "    { text: 'CANCEL' },\n" +
      "    { text: 'SUBMIT', onClick: this._onDialogSubmit }\n" +
      "  ];\n\n" +
      "  return (\n" +
      "    <RaisedButton label=\"DEMO\" onClick={this._showDialog} />\n" +
      "    <Dialog ref=\"dialogExample\" title=\"Title\" actions={dialogActions}>\n" +
      "      This is an example of a dialog component built with Facebook's React and following\n" +
      "      Google's Material Design principles.\n" +
      "    </Dialog>\n" +
      "  );\n" +
      "}\n";

		var	dialogActions = [
			{ text: 'CANCEL' },
			{ text: 'SUBMIT', onClick: this._onDialogSubmit }
		];

		return (
			<div>
    		<CodeExample code={code}>
    			<RaisedButton label="DEMO" onClick={this._showDialog} />
    		</CodeExample>
    		<Dialog ref="dialogExample" title="Title" actions={dialogActions}>
    			This is an example of a dialog component built with Facebook's React and following 
    			Google's Material Design principles.
  			</Dialog>
  		</div>
		);
	},

	_showDialog: function() {
		this.refs.dialogExample.show();
	}

});

module.exports = DialogExample;