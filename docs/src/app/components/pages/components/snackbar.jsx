var React = require('react');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var Snackbar = mui.Snackbar;
var ComponentDoc = require('../../component-doc.jsx');

var SnackbarPage = React.createClass({

  render: function() {
    var code = '<Snackbar message="Time for a snack" action="dismiss" />';

    var componentInfo = [
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
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Snackbar"
        code={code}
        componentInfo={componentInfo}>

        <RaisedButton onClick={this._handleClick} label="Show Snackbar" />
        <Snackbar ref="snackbar" message="Time for a snack" action="dismiss" />

      </ComponentDoc>
    );
  },

  _handleClick: function(e) {
    this.refs.snackbar.show();
  }

});

module.exports = SnackbarPage;