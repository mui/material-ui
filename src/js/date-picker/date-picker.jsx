var React = require('react');
var Classable = require('../mixins/classable');
var Calendar = require('./calendar.jsx');
var DateDisplay = require('./date-display.jsx');
var DialogWindow = require('../dialog-window.jsx');
var FlatButton = require('../flat-button.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    selectedDate: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      selectedDate: new Date()
    };
  },

  getInitialState: function() {
    return {
      focusDate: this.props.selectedDate,
      keyboardFocusDate: null 
    };
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker', {
    });
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true} />
    ];

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}
        contentClassName="mui-date-picker-dialog">
        <DateDisplay selectedDate={this.props.selectedDate} />
        <Calendar
          focusDate={this.state.focusDate}
          keyboardFocusDate={this.state.keyboardFocusDate}
          selectedDate={this.props.selectedDate} />
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