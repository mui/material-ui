var React = require('react');
var mui = require('mui');
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var ComponentDoc = require('../../component-doc.jsx');

var DialogPage = React.createClass({

  render: function() {

    var code = 
      '//Standard Actions\n' +
      'var standardActions = [\n' +
      '  { text: \'Cancel\' },\n' +
      '  { text: \'Submit\', onClick: this._onDialogSubmit }\n' +
      '];\n\n' +
      '<Dialog title="Dialog With Standard Actions" actions={standardActions}>\n' +
      '  The actions in this window are created from the json that\'s passed in. \n' +
      '</Dialog>\n\n' +
      '//Custom Actions\n' +
      'var customActions = [\n' +
      '  <FlatButton\n' +
      '    label="Cancel"\n' +
      '    secondary={true}\n' +
      '    onTouchTap={this._handleCustomDialogCancel} />,\n' +
      '  <FlatButton\n' +
      '    label="Submit"\n' +
      '    primary={true}\n' +
      '    onTouchTap={this._handleCustomDialogSubmit} />\n' +
      '];\n\n' +
      '<Dialog title="Dialog With Custom Actions" actions={customActions}>\n' +
      '  The actions in this window were passed in as an array of react objects.\n' +
      '</Dialog>\n';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'actions',
            type: 'array',
            header: 'optional',
            desc: 'This prop can be either a JSON object containing the actions to render, or an array of react objects.'
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

    var standardActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this._onDialogSubmit }
    ];

    var customActions = [
      <FlatButton
        key={1}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCustomDialogCancel} />,
      <FlatButton
        key={2}
        label="Submit"
        primary={true}
        onTouchTap={this._handleCustomDialogSubmit} />
    ];

    return (
      <ComponentDoc
        name="Dialog"
        code={code}
        componentInfo={componentInfo}>

        <RaisedButton label="Standard Actions" onTouchTap={this.handleStandardDialogTouchTap} />
        <br/><br/>
        <RaisedButton label="Custom Actions" onTouchTap={this.handleCustomDialogTouchTap} />

        <Dialog
          ref="standardDialog"
          title="Dialog With Standard Actions"
          actions={standardActions}>
          The actions in this window are created from the json that's passed in.
        </Dialog>

        <Dialog
          ref="customDialog"
          title="Dialog With Custom Actions"
          actions={customActions}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>

      </ComponentDoc>
    );

  },

  _handleCustomDialogCancel: function() {
    this.refs.customDialog.dismiss();
  },

  _handleCustomDialogSubmit: function() {
    this.refs.customDialog.dismiss();
  },

  handleCustomDialogTouchTap: function() {
    this.refs.customDialog.show();
  },

  handleStandardDialogTouchTap: function() {
    this.refs.standardDialog.show();
  }

});

module.exports = DialogPage;