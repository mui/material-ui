var React = require('react');
var Classable = require('../mixins/classable.js');
var WindowListenable = require('../mixins/window-listenable.js');
var DateTime = require('../utils/date-time.js');
var KeyCode = require('../utils/key-code.js');
var Calendar = require('./calendar.jsx');
var DateDisplay = require('./date-display.jsx');
var DialogWindow = require('../dialog-window.jsx');
var FlatButton = require('../flat-button.jsx');

var DatePickerDialog = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    onAccept: React.PropTypes.func,
    onClickAway: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
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

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      this.setState({
        selectedDate: nextProps.initialDate || new Date()
      });
    }
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

  _addSelectedDate: function(days) {
    var d = DateTime.clone(this.state.selectedDate);
    d.setDate(d.getDate() + days);
    this._setSelectedDate(d);
  },

  _setSelectedDate: function(d) {
    this.setState({
      selectedDate: d
    });
  },

  _handleCancelTouchTap: function() {
    this.dismiss();
  },

  _handleDateChange: function(e, date) {
    this._setSelectedDate(date);
  },

  _handleOKTouchTap: function() {
    this.dismiss();
    if (this.props.onAccept) this.props.onAccept(this.state.selectedDate);
  },

  _handleWindowKeyUp: function(e) {
    if (this.refs.dialogWindow.isOpen()) {

      switch (e.keyCode) {

        case KeyCode.UP:
          this._addSelectedDate(-7);
          break;

        case KeyCode.DOWN:
          this._addSelectedDate(7);
          break;

        case KeyCode.RIGHT:
          this._addSelectedDate(1);
          break;

        case KeyCode.LEFT:
          this._addSelectedDate(-1);
          break;

        case KeyCode.ENTER:
          this._handleOKTouchTap();
          break;

      }

    } 
  }

});

module.exports = DatePickerDialog;