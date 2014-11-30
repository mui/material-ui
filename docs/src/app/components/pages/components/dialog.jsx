var React = require('react'),
  mui = require('mui'),
  Dialog = mui.Dialog,
  RaisedButton = mui.RaisedButton,
  CodeExample = require('../../code-example/code-example.jsx'),
  ComponentInfo = require('../../component-info.jsx');

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

    return (
      <div>
        <h2 className="mui-font-style-headline">Dialog</h2>

        <CodeExample code={code}>
          <RaisedButton label="DEMO" onTouchTap={this._showDialog} />
        </CodeExample>

        <h3 className="mui-font-style-title">Props</h3>
        {this._getPropInfo()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Methods</h3>
        {this._getMethodInfo()}

        <br/><hr/><br/>

        <h3 className="mui-font-style-title">Events</h3>
        {this._getEventInfo()}

        <Dialog ref="dialogExample" title="Title" actions={dialogActions}>
          This is an example of a dialog component built with Facebook's React and following 
          Google's Material Design principles.
        </Dialog>
      </div>
    );
  },

  _showDialog: function() {
    this.refs.dialogExample.show();
  },

  _getPropInfo: function() {
    var info = [
          {
            name: 'actions',
            type: 'array',
            header: 'optional',
            desc: 'JSON data representing the button actions to render.'
          },
          {
            name: 'openImmediately',
            type: 'bool',
            header: 'optional',
            desc: 'Set to true to have the dialog automatically open on mount.'
          },
          {
            name: 'title',
            type: 'string',
            header: 'optional',
            desc: 'The title string to display on the dialog.'
          }
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getMethodInfo: function() {
    var info = [
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
        ];

    return <ComponentInfo infoArray={info} />;
  },

  _getEventInfo: function() {
    var info = [
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
        ];

    return <ComponentInfo infoArray={info} />;
  }

});

module.exports = DialogPage;