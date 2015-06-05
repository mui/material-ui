var React = require('react');
var mui = require('mui');
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var Toggle = mui.Toggle;
var ComponentDoc = require('../../component-doc.jsx');

class DialogPage extends React.Component {

  constructor() {
    super();
    this.state = {
      modal: false
    };
    this._handleCustomDialogCancel = this._handleCustomDialogCancel.bind(this);
    this._handleCustomDialogSubmit = this._handleCustomDialogSubmit.bind(this);
    this.handleCustomDialogTouchTap = this.handleCustomDialogTouchTap.bind(this);
    this.handleStandardDialogTouchTap = this.handleStandardDialogTouchTap.bind(this);
    this._handleToggleChange = this._handleToggleChange.bind(this);
  }

  render() {
    var code =
      '//Standard Actions\n' +
      'var standardActions = [\n' +
      '  { text: \'Cancel\' },\n' +
      '  { text: \'Submit\', onTouchTap: this._onDialogSubmit, ref: \'submit\' }\n' +
      '];\n\n' +
      '<Dialog\n' +
      '  title="Dialog With Standard Actions"\n' +
      '  actions={standardActions}\n' +
      '  actionFocus="submit"\n' +
      '  modal={this.state.modal}>\n' +
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
      '<Dialog\n' +
      '  title="Dialog With Custom Actions"\n' +
      '  actions={customActions}\n' +
      '  modal={this.state.modal}>\n' +
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
            name: 'actionFocus',
            type: 'string',
            header: 'optional',
            desc: 'The ref of the action to focus on when the dialog is displayed.'
          },
          {
            name: 'contentClassName',
            type: 'string',
            header: 'optional',
            desc: 'The className to add to the dialog window content container. This is the Paper ' +
                  'element that is seen when the dialog is shown.'
          },
          {
            name: 'contentInnerStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the dialog container under the title.'
          },
          {
            name: 'contentStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the dialog window content container.'
          },
          {
            name: 'openImmediately',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to have the dialog automatically open on mount.'
          },
          {
            name: 'title',
            type: 'node',
            header: 'optional',
            desc: 'The title to display on the dialog. Could be number, string, element or an array containing these types.'
          },
          {
            name: 'modal',
            type: 'bool',
            header: 'optional',
            desc: 'Determine if a dialog should display as a modal dialog. Default value is false.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of Dialog\'s root element.'
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
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
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
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}>
          The actions in this window are created from the json that&#39;s passed in.
        </Dialog>

        <Dialog
          ref="customDialog"
          title="Dialog With Custom Actions"
          actions={customActions}
          modal={this.state.modal}>
          The actions in this window were passed in as an array of react objects.
        </Dialog>

        <div style={{width: '300px', margin: '0 auto', paddingTop: '20px'}}>
          <Toggle
            label="Is Modal"
            onToggle={this._handleToggleChange}
            defaultToggled={this.state.modal}/>
        </div>

      </ComponentDoc>
    );

  }

  _onDialogSubmit() {
    console.log('Submitting');
  }

  _handleCustomDialogCancel() {
    this.refs.customDialog.dismiss();
  }

  _handleCustomDialogSubmit() {
    this.refs.customDialog.dismiss();
  }

  _handleToggleChange(e, toggled) {
    this.setState({modal: toggled});
  }

  handleCustomDialogTouchTap() {
    this.refs.customDialog.show();
  }

  handleStandardDialogTouchTap() {
    this.refs.standardDialog.show();
  }

}

module.exports = DialogPage;
