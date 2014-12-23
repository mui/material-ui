var React = require('react');
var Classable = require('../mixins/classable.js');
var DatePickerDialog = require('./date-picker-dialog.jsx');
var Input = require('../input.jsx');

var DatePicker = React.createClass({

  mixins: [Classable],

  propTypes: {
    defaultValue: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
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
          initialDate={initialDate} />
      </div>
      
    );
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