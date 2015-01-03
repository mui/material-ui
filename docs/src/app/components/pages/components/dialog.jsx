var React = require('react');
var mui = require('mui');
var Dialog = mui.Dialog;
var RaisedButton = mui.RaisedButton;
var ComponentDoc = require('../../component-doc.jsx');

var DialogPage = React.createClass({

  render: function() {

    var code = 
      'var dialogActions = [\n' +
      '  { text: \'CANCEL\' },\n' +
      '  { text: \'SUBMIT\', onClick: this._onDialogSubmit }\n' +
      '];\n\n' +
      '<Dialog title="Title" actions={dialogActions}>\n' +
      '  This is an example of a dialog component built with Facebook\'s React and following \n' +
      '  Google\'s Material Design principles.\n' +
      '</Dialog>\n';

    var dialogActions = [
      { text: 'CANCEL' },
      { text: 'SUBMIT', onClick: this._onDialogSubmit }
    ];

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'actions',
            type: 'array',
            header: 'optional',
            desc: 'JSON data representing the button actions to render.'
          },
          {
            name: 'contentClassName',
            type: 'string',
            header: 'optional',
            desc: 'The className to add to the dialog window content container.'
          },
          {
            name: 'openImmediately',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to have the dialog automatically open on mount.'
          },
          {
            name: 'title',
            type: 'string',
            header: 'optional',
            desc: 'The title string to display on the dialog.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'dismiss',
            header: 'Dialog.dismiss()',
            desc: 'Hides the dialog.'
          },
          {
            name: 'show',
            header: 'Dialog.show()',
            desc: 'Shows the dialog.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onDismiss',
            header: 'function()',
            desc: 'Fired when the dialog is dismissed.'
          },
          {
            name: 'onShow',
            header: 'function()',
            desc: 'Fired when the dialog is shown.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Dialog"
        code={code}
        componentInfo={componentInfo}>

        <RaisedButton label="DEMO" onTouchTap={this._showDialog} />
        <Dialog
          ref="dialogExample"
          title="Title"
          actions={dialogActions}>

          This is an example of a dialog component built with Facebook's React and following 
          Google's Material Design principles.
        </Dialog>

      </ComponentDoc>
    );

  },

  _showDialog: function() {
    this.refs.dialogExample.show();
  }

});

module.exports = DialogPage;