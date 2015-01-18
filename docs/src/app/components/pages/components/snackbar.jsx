var React = require('react');
var mui = require('mui');
var RaisedButton = mui.RaisedButton;
var Snackbar = mui.Snackbar;
var ComponentDoc = require('../../component-doc.jsx');

var SnackbarPage = React.createClass({

  render: function() {
    var code = 
      '<Snackbar\n' + 
      '  message="Event added to your calendar"\n' + 
      '  action="undo"\n' + 
      '  onActionTouchTap={this._handleAction}/>\n\n' +
      '//Somewhere in our code\n' +
      '_handleAction: function() {\n' +
      '  //We can add more code to this function, but for now we\'ll just include an alert.\n' +
      '  alert("We removed the event from your calendar.");\n' +
      '}';
      ;

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

        <RaisedButton 
          onTouchTap={this._handleClick} 
          label="Add to my calendar" />

        <Snackbar 
          ref="snackbar" 
          message="Event added to your calendar"
          action="undo" 
          onActionTouchTap={this._handleAction} />

      </ComponentDoc>
    );
  },

  _handleClick: function(e) {
    this.refs.snackbar.show();
  },

  _handleAction: function() {
    //We can add more code here! In this example, we'll just include an alert.
    alert("We removed the event from your calendar.");
  }

});

module.exports = SnackbarPage;