import React from 'react';
import warning from 'warning';
import DateTime from '../utils/date-time.js';
import TimePickerDialog from './time-picker-dialog';
import TextField from '../text-field';
import getMuiTheme from '../styles/getMuiTheme';

const emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);
emptyTime.setSeconds(0);
emptyTime.setMilliseconds(0);

const TimePicker = React.createClass({

  propTypes: {
    /**
     * If true, automatically accept and close the picker on set minutes.
     */
    autoOk: React.PropTypes.bool,

    /**
     * This is the initial time value of the component.
     */
    defaultTime: React.PropTypes.object,

    /**
     * Tells the component to display the picker in
     * ampm (12hr) format or 24hr format.
     */
    format: React.PropTypes.oneOf(['ampm', '24hr']),

    /**
     * Callback function that is fired when the time
     * value changes. The time value is passed in a Date
     * Object.Since there is no particular event associated
     * with the change the first argument will always be null
     * and the second argument will be the new Date instance.
     */
    onChange: React.PropTypes.func,

    /**
     * Fired when the timepicker dialog is dismissed.
     */
    onDismiss: React.PropTypes.func,

    /**
     * Callback function that is fired when the timepicker field gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Fired when the timepicker dialog is shown.
     */
    onShow: React.PropTypes.func,

    /**
     * Callback for touch tap event.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * It's technically more correct to refer to
     * "12 noon" and "12 midnight" rather than
     * "12 a.m." and "12 p.m." and it avoids real
     * confusion between different locales. By default
     * (for compatibility reasons) TimePicker uses
     * (12 a.m./12 p.m.) To use (noon/midnight) set pedantic={true}.
     */
    pedantic: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override the inline-styles of TimePicker's TextField element.
     */
    textFieldStyle: React.PropTypes.object,

    /**
     * Sets the time for the Time Picker programmatically.
     */
    value: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
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
      time: this._isControlled() ? this._getControlledTime() : this.props.defaultTime,
      dialogTime: new Date(),
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newState = this.state;
    if (nextContext.muiTheme) {
      newState.muiTheme = nextContext.muiTheme;
    }
    newState.time = this._getControlledTime(nextProps);
    this.setState(newState);
  },


  /**
   * Deprecated.
   * returns timepicker value.
   **/
  getTime() {
    warning(false, `getTime() method is deprecated. Use the defaultTime property
    instead. Or use the TimePicker as a controlled component with the value
    property.`);
    return this.state.time;
  },

  /**
   * Deprecated
   * sets timepicker value.
   **/
  setTime(time) {
    warning(false, `setTime() method is deprecated. Use the defaultTime property
    instead. Or use the TimePicker as a controlled component with the value
    property.`);
    this.setState({time: time ? time : emptyTime});
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  },

  openDialog() {
    this.setState({
      dialogTime: this.state.time,
    });
    this.refs.dialogWindow.show();
  },

  _handleDialogAccept(t) {
    this.setState({
      time: t,
    });
    if (this.props.onChange) this.props.onChange(null, t);
  },

  _handleInputFocus(event) {
    event.target.blur();
    if (this.props.onFocus) this.props.onFocus(event);
  },

  _handleInputTouchTap(event) {
    event.preventDefault();

    this.openDialog();

    if (this.props.onTouchTap) this.props.onTouchTap(event);
  },

  _isControlled() {
    return this.props.value !== null;
  },

  _getControlledTime(props = this.props) {
    let result = null;
    if (DateTime.isDateObject(props.value)) {
      result = props.value;
    }
    return result;
  },

  render() {
    const {
      autoOk,
      format,
      onFocus,
      onTouchTap,
      onShow,
      onDismiss,
      style,
      textFieldStyle,
      pedantic,
      ...other,
    } = this.props;

    const {
      muiTheme: {
        prepareStyles,
      },
      time,
    } = this.state;

    return (
      <div style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={time === emptyTime ? null : DateTime.formatTime(time, format, pedantic)}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap}
        />
        <TimePickerDialog
          ref="dialogWindow"
          initialTime={this.state.dialogTime}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={onDismiss}
          format={format}
          autoOk={autoOk}
        />
      </div>
    );
  },
});

export default TimePicker;
