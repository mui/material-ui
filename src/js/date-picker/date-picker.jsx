var React = require('react');
var Classable = require('../mixins/classable');
var Calendar = require('./calendar.jsx');
var DateDisplay = require('./date-display.jsx');
var DialogWindow = require('../dialog-window.jsx');
var FlatButton = require('../flat-button.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    initialDate: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date()
    };
  },

  getInitialState: function() {
    return {
      selectedDate: this.props.initialDate
    };
  },

  render: function() {
    var {
      className,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker');
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
        contentClassName="mui-date-picker-dialog"
        onDismiss={this._handleDialogDismiss}
        repositionOnUpdate={false}>
        <DateDisplay selectedDate={this.state.selectedDate} />
        <Calendar
          onSelectedDateChange={this._handleDateChange}
          selectedDate={this.state.selectedDate} />
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
  },

  _handleDateChange: function(e, date) {
    this.setState({
      selectedDate: date
    });
  },

  _handleDialogDismiss: function() {
    this.setState(this.getInitialState());
  }

});

module.exports = DatePicker;