var React = require('react');
var Classable = require('../mixins/classable');
var DialogWindow = require('../dialog-window.jsx');
var FlatButton = require('../flat-button.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker', {
    });
    var actions = [
      <FlatButton
        label="OK"
        secondary={true} />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCancelTouchTap} />
    ];

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}
        contentClassName="mui-date-picker-dialog">
        date picker
      </DialogWindow>
    );
  },

  show: function() {
    this.refs.dialogWindow.show();
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  _handleCancelTouchTap: function() {
    this.refs.dialogWindow.dismiss();
  }

});

module.exports = DatePicker;