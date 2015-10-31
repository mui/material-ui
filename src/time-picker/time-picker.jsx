const React = require('react');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const TimePickerDialog = require('./time-picker-dialog');
const TextField = require('../text-field');
const DateTime = require('../utils/date-time');


let emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);


const TimePicker = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    autoOk: React.PropTypes.bool,
    defaultTime: React.PropTypes.object,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    pedantic: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    style: React.PropTypes.object,
    textFieldStyle: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp',
  },

  getDefaultProps() {
    return {
      defaultTime: null,
      format: 'ampm',
      pedantic: false,
      autoOk: false,
      style: {},
    };
  },

  getInitialState() {
    return {
      time: this._isControlled() ? this._getControlledTime() : (this.props.defaultTime || emptyTime),
      dialogTime: new Date(),
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this._isControlled()) {
      let newTime = this._getControlledTime(nextProps);
      if (!DateTime.isEqualDate(this.state.time, newTime)) {
        this.setState({
          time: newTime,
        });
      }
    }
  },

  formatTime(date) {
    let hours = date.getHours();
    let mins = date.getMinutes().toString();

    if (this.props.format === "ampm"){
      let isAM = hours < 12;
      hours = hours % 12;
      let additional = isAM ? " am" : " pm";
      hours = (hours || 12).toString();

      if (mins.length < 2 ) mins = "0" + mins;

      if (this.props.pedantic) {
        // Treat midday/midnight specially http://www.nist.gov/pml/div688/times.cfm
        if (hours === "12" && mins === "00") {
          return additional === " pm" ? "12 noon" : "12 midnight";
        }
      }

      return hours + (mins === "00" ? "" : ":" + mins) + additional;
    }

    hours = hours.toString();

    if (hours.length < 2) hours = "0" + hours;
    if (mins.length < 2) mins = "0" + mins;

    return hours + ":" + mins;
  },

  render() {
    let {
      autoOk,
      format,
      onFocus,
      onTouchTap,
      onShow,
      onDismiss,
      style,
      textFieldStyle,
      valueLink,
      ...other,
    } = this.props;

    let defaultInputValue;

    if (this.props.defaultTime) {
      defaultInputValue = this.formatTime(this.props.defaultTime);
    }

    return (
      <div style={this.prepareStyles(style)}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={this.state.time ? this.formatTime(this.state.time) : undefined}
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap} />
        <TimePickerDialog
          ref="dialogWindow"
          initialTime={this.state.dialogTime}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={onDismiss}
          format={format}
          autoOk={autoOk} />
      </div>
    );
  },

  getTime() {
    return this.state.time;
  },

  setTime(t) {
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call TimePicker.setTime when value or valueLink is defined as a property.');
    }
    this.setState({
      time: t,
    });
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  },

  openDialog() {
    this.setState({
      dialogTime: this.getTime(),
    });

    this.refs.dialogWindow.show();
  },

  _handleDialogAccept(t) {
    if (!this._isControlled()) {
      this.setTime(t)
    }
    if (this.props.onChange) this.props.onChange(null, t);
    if (this.props.valueLink) this.props.valueLink.requestChange(t);
  },

  _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap(e) {
    e.preventDefault();

    this.openDialog();

    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

  _getControlledTime(props = this.props) {
    if (DateTime.isDateObject(props.value)) {
      return props.value;
    } else if (props.valueLink && DateTime.isDateObject(props.valueLink.value)) {
      return props.valueLink.value;
    }
  },
});

module.exports = TimePicker;
