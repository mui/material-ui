var React = require('react');
var Classable = require('../mixins/classable.js');
var WindowListenable = require('../mixins/window-listenable.js');
var DateTime = require('../utils/date-time.js');
var KeyCode = require('../utils/key-code.js');
var DatePickerDialog = require('./date-picker-dialog.jsx');
var Input = require('../input.jsx');

var DatePicker = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      formatDate: DateTime.format
    };
  },

  getInitialState: function() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date()
    };
  },

  render: function() {
    var {
      formatDate,
      mode,
      onFocus,
      onTouchTap,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker', {
      'mui-is-landscape': this.props.mode === 'landscape',
      'mui-is-inline': this.props.mode === 'inline'
    });
    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    return (
      <div className={classes}>
        <Input
          {...other}
          ref="input"
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap} />
        <DatePickerDialog
          ref="dialogWindow"
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept} />
      </div>
      
    );
  },

  getDate: function() {
    return this.state.value;
  },

  setDate: function(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function(d) {
    this.setDate(d);
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
  },

  _handleWindowKeyUp: function(e) {
    //TO DO: open the dialog if input has focus
  }

});

module.exports = DatePicker;