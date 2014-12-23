var React = require('react');
var Classable = require('../mixins/classable.js');
var DateTime = require('../utils/date-time.js');
var DatePickerDialog = require('./date-picker-dialog.jsx');
var Input = require('../input.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      dateFormat: ''
    };
  },

  getInitialState: function() {
    return {
      dialogDate: new Date()
    };
  },

  render: function() {
    var {
      onFocus,
      onTouchTap,
      ...other
    } = this.props;
    var initialDate;

    return (
      <div className="mui-date-picker">
        <Input
          {...other}
          ref="input"
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap} />
        <DatePickerDialog
          ref="dialogWindow"
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept} />
      </div>
      
    );
  },

  _handleDialogAccept: function(d) {
    //TO DO: need to allow users to specify a date format
    this.refs.input.setValue(DateTime.format(d));
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    var dateString = this.refs.input.getValue();
    var inputDate = dateString ? new Date(dateString) : new Date();

    this.setState({
      dialogDate: inputDate
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = DatePicker;