const React = require('react');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const TimePickerDialog = require('./time-picker-dialog');
const TextField = require('../text-field');
const ThemeManager = require('../styles/theme-manager');
const DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');


let emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);
emptyTime.setSeconds(0);
emptyTime.setMilliseconds(0);


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
      time: this.props.defaultTime || emptyTime,
      dialogTime: new Date(),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
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
    if (t){
      this.setState({
        time: t,
      });
      
      this.refs.input.setValue(this.formatTime(t));
    }else{
      this.setState({
        time: emptyTime,
      });
      
      this.refs.input.setValue(null);
    }
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
    this.setTime(t);
    if (this.props.onChange) this.props.onChange(null, t);
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
});

module.exports = TimePicker;
