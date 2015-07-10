let React = require('react');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let DateTime = require('../utils/date-time');
let DatePickerDialog = require('./date-picker-dialog');
let TextField = require('../text-field');


let DatePicker = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    autoOk: React.PropTypes.bool,
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape', 'inline']),
    onDismiss: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool,
    style: React.PropTypes.object,
    textFieldStyle: React.PropTypes.object,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },

  getDefaultProps() {
    return {
      formatDate: DateTime.format,
      autoOk: false,
      showYearSelector: false,
    };
  },

  getInitialState() {
    return {
      date: this.props.defaultDate,
      dialogDate: new Date(),
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDate !== nextProps.defaultDate) {
      this.setDate(nextProps.defaultDate);
    }
  },

  render() {
    let {
      autoOk,
      formatDate,
      maxDate,
      minDate,
      mode,
      onDismiss,
      onFocus,
      onTouchTap,
      onShow,
      showYearSelector,
      style,
      textFieldStyle,
      ...other,
    } = this.props;
    let defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.props.formatDate(this.props.defaultDate);
    }

    return (
      <div style={style}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          defaultValue={defaultInputValue}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap}/>
        <DatePickerDialog
          ref="dialogWindow"
          mode={mode}
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={this._handleDialogDismiss}
          minDate={minDate}
          maxDate={maxDate}
          autoOk={autoOk}
          showYearSelector={showYearSelector}
          shouldDisableDate={this.props.shouldDisableDate}
          hideToolbarYearChange={this.props.hideToolbarYearChange} />
      </div>

    );
  },

  getDate() {
    return this.state.date;
  },

  setDate(d) {
    this.setState({
      date: d,
    });
    this.refs.input.setValue(this.props.formatDate(d));
  },

  _handleDialogAccept(d) {
    this.setDate(d);
    if (this.props.onChange) this.props.onChange(null, d);
  },

  _handleDialogDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap(e) {
    this.setState({
      dialogDate: this.getDate(),
    });

    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _handleWindowKeyUp() {
    //TO DO: open the dialog if input has focus
  },

});

module.exports = DatePicker;
