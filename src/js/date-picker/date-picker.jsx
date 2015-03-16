var React = require('react');
var Classable = require('../mixins/classable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var DatePickerDialog = require('./date-picker-dialog');
var TextField = require('../text-field');

var DatePicker = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
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
      onShow,
      onDismiss,
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
        <TextField
          {...other}
          ref="input"
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap} />
        <DatePickerDialog
          ref="dialogWindow"
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={onDismiss} />
      </div>

    );
  },

  getDate: function() {
    return this.state.date;
  },

  setDate: function(d) {
    this.setState({
      date: d
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept: function(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    this.setState({
      dialogDate: this.getDate()
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _handleWindowKeyUp: function(e) {
    //TO DO: open the dialog if input has focus
  }

});

module.exports = DatePicker;
