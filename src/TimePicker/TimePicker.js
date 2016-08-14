import React, {Component, PropTypes} from 'react';
import TimePickerDialog from './TimePickerDialog';
import TextField from '../TextField';
import {formatTime} from './timeUtils';

const emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);
emptyTime.setSeconds(0);
emptyTime.setMilliseconds(0);

class TimePicker extends Component {
  static propTypes = {
    /**
     * If true, automatically accept and close the picker on set minutes.
     */
    autoOk: PropTypes.bool,
    /**
     * Override the label of the 'Cancel' button.
     */
    cancelLabel: PropTypes.node,
    /**
     * The initial time value of the TimePicker.
     */
    defaultTime: PropTypes.object,
    /**
     * Override the inline-styles of TimePickerDialog's body element.
     */
    dialogBodyStyle: PropTypes.object,
    /**
     * Override the inline-styles of TimePickerDialog's root element.
     */
    dialogStyle: PropTypes.object,
    /**
     * If true, the TimePicker is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Tells the component to display the picker in `ampm` (12hr) format or `24hr` format.
     */
    format: PropTypes.oneOf(['ampm', '24hr']),
    /**
     * Override the label of the 'OK' button.
     */
    okLabel: PropTypes.node,
    /**
     * Callback function that is fired when the time value changes. The time value is passed in a Date Object.
     * Since there is no particular event associated with the change the first argument will always be null
     * and the second argument will be the new Date instance.
     */
    onChange: PropTypes.func,
    /**
     * Callback function fired when the TimePicker dialog is dismissed.
     */
    onDismiss: PropTypes.func,
    /**
     * Callback function fired when the TimePicker `TextField` gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function fired when the TimePicker dialog is shown.
     */
    onShow: PropTypes.func,
    /**
     * Callback function fired when the TimePicker is tapped or clicked.
     */
    onTouchTap: PropTypes.func,
    /**
     * If true, uses ("noon" / "midnight") instead of ("12 a.m." / "12 p.m.").
     *
     * It's technically more correct to refer to "12 noon" and "12 midnight" rather than "12 a.m." and "12 p.m."
     * and it avoids confusion between different locales. By default (for compatibility reasons) TimePicker uses
     * ("12 a.m." / "12 p.m.").
     */
    pedantic: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of TimePicker's TextField element.
     */
    textFieldStyle: PropTypes.object,
    /**
     * Sets the time for the Time Picker programmatically.
     */
    value: PropTypes.object,
  };

  static defaultProps = {
    autoOk: false,
    cancelLabel: 'Cancel',
    defaultTime: null,
    disabled: false,
    format: 'ampm',
    okLabel: 'OK',
    pedantic: false,
    style: {},
    value: null,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    time: null,
    dialogTime: new Date(),
  };

  componentWillMount() {
    this.setState({
      time: this.isControlled() ? this.getControlledTime() : this.props.defaultTime,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        time: this.getControlledTime(nextProps),
      });
    }
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  openDialog() {
    this.setState({
      dialogTime: this.state.time,
    });
    this.refs.dialogWindow.show();
  }

  handleAcceptDialog = (time) => {
    this.setState({
      time: time,
    });
    if (this.props.onChange) this.props.onChange(null, time);
  };

  handleFocusInput = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleTouchTapInput = (event) => {
    event.preventDefault();

    if (!this.props.disabled) {
      this.openDialog();
    }

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }
  };

  isControlled() {
    return this.props.value !== null;
  }

  getControlledTime(props = this.props) {
    let result = null;
    if (props.value instanceof Date) {
      result = props.value;
    }
    return result;
  }

  render() {
    const {
      autoOk,
      cancelLabel,
      defaultTime, // eslint-disable-line no-unused-vars
      dialogBodyStyle,
      dialogStyle,
      format,
      okLabel,
      onFocus, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      onShow,
      onDismiss,
      pedantic,
      style,
      textFieldStyle,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const {time} = this.state;

    return (
      <div style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={time === emptyTime ? null : formatTime(time, format, pedantic)}
          onFocus={this.handleFocusInput}
          onTouchTap={this.handleTouchTapInput}
        />
        <TimePickerDialog
          ref="dialogWindow"
          bodyStyle={dialogBodyStyle}
          initialTime={this.state.dialogTime}
          onAccept={this.handleAcceptDialog}
          onShow={onShow}
          onDismiss={onDismiss}
          format={format}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          autoOk={autoOk}
          style={dialogStyle}
        />
      </div>
    );
  }
}

export default TimePicker;
