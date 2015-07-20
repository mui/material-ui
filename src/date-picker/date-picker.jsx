let React = require('react');
let StylePropable = require('../mixins/style-propable');
let WindowListenable = require('../mixins/window-listenable');
let DateTime = require('../utils/date-time');
let DatePickerDialog = require('./date-picker-dialog');
let TextField = require('../text-field');

/**
 * Check if a value is a valid Date instance.
 *
 * @param value The value to check.
 * @returns {boolean} True if the object provided is valid, false otherwise.
 */
function isValid(value) {
  return value instanceof Date;
}

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
      date: this._getPropsDate(),
      dialogDate: new Date(),
    };
  },

  /**
   * If this is a controlled input, rather than checking all the possible dates for changes
   * ourselves, just assign the current props date and let setState do the checking.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      this.setDate(this._getPropsDate(nextProps));
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

  /**
   * Setting the state will update the date here and also re-render the TextField with
   * the new value.
   */
  setDate(d) {
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
      // State changes aren't always handled immediately,
      // better to wait on the callback.
    }, () => this.refs.dialogWindow.show());
  },

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  },

  _handleDialogAccept(d) {
    this.setDate(d);
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

  _getPropsDate(props = this.props) {
    if (isValid(props.value)) {
      return props.value;
    } else if (props.valueLink && isValid(props.valueLink.value)) {
      return props.valueLink.value;
    } else if (isValid(props.defaultDate)) {
      return props.defaultDate;
    }
  },

});

module.exports = DatePicker;
