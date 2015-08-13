let React = require('react');
let { RaisedButton, Snackbar, TextField } = require('material-ui');
let ComponentDoc = require('../../component-doc');
let Code = require('snackbars-code');

class SnackbarPage extends React.Component {

  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
    this._updateAutoHideDuration = this._updateAutoHideDuration.bind(this);

    this.state = {
      autoHideDuration: 0
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
            desc: 'The name of the action on the snackbar.'
          },
          {
            name: 'autoHideDuration',
            type: 'number',
            header: 'optional',
            desc: 'The number of milliseconds to wait before automatically dismissing. If no value is specified the snackbar will dismiss normally. If a value is provided the snackbar can still be dismissed normally. If a snackbar is dismissed before the timer expires, the timer will be cleared.'
          },
          {
            name: 'message',
            type: 'string',
            header: 'required',
            desc: 'The message to be displayed on the snackbar.'
          },
          {
            name: 'openOnMount',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the snackbar will open once mounted.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Snackbar\'s root element.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'dismiss',
            header: 'Snackbar.dismiss()',
            desc: 'Hides the snackbar.'
          },
          {
            name: 'show',
            header: 'Snackbar.show()',
            desc: 'Shows the snackbar.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onActionTouchTap',
            header: 'function(e)',
            desc: 'Fired when the action button is touchtapped.'
          },
          {
            name: 'onDismiss',
            header: 'function()',
            desc: 'Fired when the snackbar is dismissed.'
          },
          {
            name: 'onShow',
            header: 'function()',
            desc: 'Fired when the snackbar is shown.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Snackbar"
        code={Code}
        componentInfo={componentInfo}>

        <RaisedButton
          onTouchTap={this._handleClick}
          label="Add to my calendar" />

        <br />

        <TextField
          floatingLabelText="Auto Hide Duration in ms"
          value={this.state.autoHideDuration}
          onChange={this._updateAutoHideDuration} />

        <Snackbar
          ref="snackbar"
          message="Event added to your calendar"
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleAction} />

      </ComponentDoc>
    );
  }

  _handleClick(e) {
    this.refs.snackbar.show();
  }

  _handleAction() {
    //We can add more code here! In this example, we'll just include an alert.
    window.alert("We removed the event from your calendar.");
  }

  _updateAutoHideDuration(e) {
    let value = e.target.value;
    this.setState({
      autoHideDuration: value.length > 0 ? parseInt(value) : undefined
    });
  }

}

module.exports = SnackbarPage;
