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
      date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
      dialogDate: new Date(),
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this._isControlled()) {
      let newDate = this._getControlledDate(nextProps);
      if (!DateTime.isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate,
        });
      }
    }
  },

  render() {
    let {
      autoOk,
      defaultDate,
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

    return (
      <div style={style}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={this.state.date ? formatDate(this.state.date) : undefined}
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
    if (process.env.NODE_ENV !== 'production' && this._isControlled()) {
      console.error('Cannot call DatePicker.setDate when value or valueLink is defined as a property.');
    }
    this.setState({
      date: d,
    });
  },

  /**
   * Open the date-picker dialog programmatically from a parent.
   */
  openDialog() {
    this.setState({
      dialogDate: this.getDate(),
    }, this.refs.dialogWindow.show);
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  },

  _handleDialogAccept(d) {
    if (!this._isControlled()) {
      this.setDate(d);
    }
    if (this.props.onChange) this.props.onChange(null, d);
    if (this.props.valueLink) this.props.valueLink.requestChange(d);
  },

  _handleDialogDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap(e) {
    this.openDialog();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _handleWindowKeyUp() {
    //TO DO: open the dialog if input has focus
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

  _getControlledDate(props = this.props) {
    if (DateTime.isDateObject(props.value)) {
      return props.value;
    } else if (props.valueLink && DateTime.isDateObject(props.valueLink.value)) {
      return props.valueLink.value;
    }
  },

});

module.exports = DatePicker;
