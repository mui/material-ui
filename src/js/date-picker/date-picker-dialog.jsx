var React = require('react');
var Classable = require('../mixins/classable.js');
var StateResetable = require('../mixins/state-resetable.js');
var Calendar = require('./calendar.jsx');
var DateDisplay = require('./date-display.jsx');
var DialogWindow = require('../dialog-window.jsx');
var FlatButton = require('../flat-button.jsx');

var DatePickerDialog = React.createClass({

  mixins: [Classable, StateResetable],

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onClickAway: React.PropTypes.func
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
      initialDate,
      onAccept,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker-dialog');
    var actions = [
      <FlatButton
        key={0}
        label="Cancel"
        secondary={true}
        onTouchTap={this._handleCancelTouchTap} />,
      <FlatButton
        key={1}
        label="OK"
        secondary={true}
        onTouchTap={this._handleOKTouchTap} />
    ];

    return (
      <DialogWindow {...other}
        ref="dialogWindow"
        className={classes}
        actions={actions}
        contentClassName="mui-date-picker-dialog-window"
        onClickAway={this._handleClickAway}
        repositionOnUpdate={false}>
        <DateDisplay selectedDate={this.state.selectedDate} />
        <Calendar
          ref="calendar"
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
    this._resetState();
    this.dismiss();
  },

  _handleClickAway: function() {
    this._resetState();
    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleDateChange: function(e, date) {
    this.setState({
      selectedDate: date
    });
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) this.props.onAccept(this.state.selectedDate);
  },

  _resetState: function() {
    this.resetState(function() {
      this.refs.calendar.resetState();
    });
  }

});

module.exports = DatePickerDialog;