let React = require('react');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let TimePickerDialog = require('./time-picker-dialog');
let TextField = require('../text-field');


let emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);


let TimePicker = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    defaultTime: React.PropTypes.object,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp',
  },

  getDefaultProps() {
    return {
      defaultTime: emptyTime,
      format: 'ampm',
    };
  },

  getInitialState() {
    return {
      time: this.props.defaultTime,
      dialogTime: new Date(),
    };
  },

  formatTime(date) {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let aditional = "";

    if (this.props.format === "ampm"){
      let isAM = hours < 12;
      hours = hours % 12;
      aditional += isAM ? " am" : " pm";
      hours = hours || 12;
    }

    hours = hours.toString();
    mins = mins.toString();

    if (hours.length < 2) hours = "0" + hours;
    if (mins.length < 2) mins = "0" + mins;

    return hours + ":" + mins + aditional;
  },

  render() {
    let {
      format,
      onFocus,
      onTouchTap,
      onShow,
      onDismiss,
      ...other,
    } = this.props;

    let defaultInputValue;

    if (this.props.defaultTime) {
      defaultInputValue = this.formatTime(this.props.defaultTime);
    }

    return (
      <div >
        <TextField
          {...other}
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
          format={format} />
      </div>
    );
  },

  getTime() {
    return this.state.time;
  },

  setTime(t) {
    this.setState({
      time: t,
    });
    this.refs.input.setValue(this.formatTime(t));
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

    this.setState({
      dialogTime: this.getTime(),
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },
});

module.exports = TimePicker;
