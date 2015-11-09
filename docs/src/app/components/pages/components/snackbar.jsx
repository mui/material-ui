const React = require('react');
const { RaisedButton, Snackbar, TextField, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('snackbars-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class SnackbarPage extends React.Component {

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._handleClickDouble = this._handleClickDouble.bind(this);
    this._updateAutoHideDuration = this._updateAutoHideDuration.bind(this);

    this.state = {
      autoHideDuration: 0,
      message: 'Event added to your calendar',
    };
  }

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'action',
            type: 'string',
            header: 'optional',
            desc: 'The name of the action on the snackbar.',
          },
          {
            name: 'autoHideDuration',
            type: 'number',
            header: 'optional',
            desc: 'The number of milliseconds to wait before automatically dismissing. If no value is specified the snackbar will dismiss normally. If a value is provided the snackbar can still be dismissed normally. If a snackbar is dismissed before the timer expires, the timer will be cleared.',
          },
          {
            name: 'message',
            type: 'string',
            header: 'required',
            desc: 'The message to be displayed on the snackbar.',
          },
          {
            name: 'openOnMount',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the snackbar will open once mounted.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Snackbar\'s root element.',
          },
        ],
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'dismiss',
            header: 'Snackbar.dismiss()',
            desc: 'Hides the snackbar.',
          },
          {
            name: 'show',
            header: 'Snackbar.show()',
            desc: 'Shows the snackbar.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onActionTouchTap',
            header: 'function(event)',
            desc: 'Fired when the action button is touchtapped.',
          },
          {
            name: 'onDismiss',
            header: 'function()',
            desc: 'Fired when the snackbar is dismissed.',
          },
          {
            name: 'onShow',
            header: 'function()',
            desc: 'Fired when the snackbar is shown.',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Snackbar"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst Snackbar = require(\'material-ui/lib/snackbar\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <RaisedButton
            onTouchTap={this._handleClick}
            label="Add to my calendar" />

          <br />
          <br />

          <RaisedButton
            onTouchTap={this._handleClickDouble}
            label="Add to my calendar two times" />

          <br />

          <TextField
            floatingLabelText="Auto Hide Duration in ms"
            value={this.state.autoHideDuration}
            onChange={this._updateAutoHideDuration} />

          <Snackbar
            ref="snackbar"
            message={this.state.message}
            action="undo"
            autoHideDuration={this.state.autoHideDuration}
            onActionTouchTap={this._handleAction} />
        </CodeExample>
      </ComponentDoc>
    );
  }

  _handleClick() {
    this.refs.snackbar.show();
  }

  _handleClickDouble() {
    this.refs.snackbar.show();

    const duration = this.state.autoHideDuration / 2 || 2000;

    setTimeout(() => {
      this.setState({
        message: 'Event ' + Math.round(Math.random() * 100) + ' added to your calendar',
      });
    }, duration);
  }

  _handleAction() {
    //We can add more code here! In this example, we'll just include an alert.
    window.alert("We removed the event from your calendar.");
  }

  _updateAutoHideDuration(e) {
    let value = e.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : undefined,
    });
  }
}
