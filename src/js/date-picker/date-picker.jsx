var React = require('react');
var Classable = require('../mixins/classable.js');
var DateTime = require('../utils/date-time.js');
var DatePickerDialog = require('./date-picker-dialog.jsx');
var Input = require('../input.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    defaultValue: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      dateFormat: ''
    };
  },

  render: function() {
    var {
      defaultValue,
      onFocus,
      onTouchTap,
      ...other
    } = this.props;
    var initialDate;

    if (this.props.defaultValue) {
      initialDate = new Date(this.props.defaultValue);
    }

    return (
      <div className="mui-date-picker">
        <Input
          {...other}
          ref="input"
          defaultValue={defaultValue}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap} />
        <DatePickerDialog
          ref="dialogWindow"
          initialDate={initialDate}
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
    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = DatePicker;