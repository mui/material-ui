import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {dateTimeFormat, formatIso, isEqualDate} from './dateUtils';
import DatePickerDialog from './DatePickerDialog';
import TextField from '../TextField';
import deprecated from '../utils/deprecatedPropType';
import keycode from 'keycode';

class DatePicker extends Component {
  static propTypes = {
    /**
     * Constructor for date formatting for the specified `locale`.
     * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
     * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
     * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
     *
     * By default, a built-in `DateTimeFormat` is used which supports the 'en-US' `locale`.
     */
    DateTimeFormat: PropTypes.func,
    /**
     * If true, automatically accept and close the picker on select a date.
     */
    autoOk: PropTypes.bool,
    /**
     * Override the default text of the 'Cancel' button.
     */
    cancelLabel: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Used to control how the Date Picker will be displayed when the input field is focused.
     * `dialog` (default) displays the DatePicker as a dialog with a modal.
     * `inline` displays the DatePicker below the input field (similar to auto complete).
     */
    container: PropTypes.oneOf(['dialog', 'inline']),
    /**
     * This is the initial date value of the component.
     * If either `value` or `valueLink` is provided they will override this
     * prop with `value` taking precedence.
     */
    defaultDate: PropTypes.object,
    /**
     * Override the inline-styles of DatePickerDialog's Container element.
     */
    dialogContainerStyle: PropTypes.object,
    /**
     * Disables the year selection in the date picker.
     */
    disableYearSelection: PropTypes.bool,
    /**
     * Disables the DatePicker.
     */
    disabled: PropTypes.bool,
    /**
     * The error content to display
     */
    errorText: PropTypes.string,
    /**
     * Used to change the first day of week. It varies from
     * Saturday to Monday between different locales.
     * The allowed range is 0 (Sunday) to 6 (Saturday).
     * The default is `1`, Monday, as per ISO 8601.
     */
    firstDayOfWeek: PropTypes.number,
    /**
     * This function is called to format the date displayed in the input field, and should return a string.
     * By default if no `locale` and `DateTimeFormat` is provided date objects are formatted to ISO 8601 YYYY-MM-DD.
     *
     * @param {object} date Date object to be formatted.
     * @returns {any} The formatted date.
     */
    formatDate: PropTypes.func,
    /**
     * The hint content to display
     */
    hintText: PropTypes.string,
    /**
     * Tells the datepicker to handle keyboard input. The container must also be set to inline for this to take effect.
     */
    keyboardEnabled: PropTypes.bool,
    /**
     * Locale used for formatting the `DatePicker` date strings. Other than for 'en-US', you
     * must provide a `DateTimeFormat` that supports the chosen `locale`.
     */
    locale: PropTypes.string,
    /**
     * The ending of a range of valid dates. The range includes the endDate.
     * The default value is current date + 100 years.
     */
    maxDate: PropTypes.object,
    /**
     * The beginning of a range of valid dates. The range includes the startDate.
     * The default value is current date - 100 years.
     */
    minDate: PropTypes.object,
    /**
     * Tells the component to display the picker in portrait or landscape mode.
     */
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    /**
     * Override the default text of the 'OK' button.
     */
    okLabel: PropTypes.node,
    /**
     * Callback function that is fired when the date value changes.
     *
     * @param {null} null Since there is no particular event associated with the change,
     * the first argument will always be null.
     * @param {object} date The new date.
     */
    onChange: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's dialog is dismissed.
     */
    onDismiss: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's `TextField` gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function that is fired when the Date Picker's dialog is shown.
     */
    onShow: PropTypes.func,
    /**
     * Callback function that is fired when a touch tap event occurs on the Date Picker's `TextField`.
     *
     * @param {object} event TouchTap event targeting the `TextField`.
     */
    onTouchTap: PropTypes.func,
    /**
     * Callback function used to determine if a day's entry should be disabled on the calendar.
     *
     * @param {object} day Date object of a day.
     * @returns {boolean} Indicates whether the day should be disabled.
     */
    shouldDisableDate: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of DatePicker's TextField element.
     */
    textFieldStyle: PropTypes.object,
    /**
     * Sets the date for the Date Picker programmatically.
     */
    value: PropTypes.object,
  };

  static defaultProps = {
    autoOk: false,
    container: 'dialog',
    disabled: false,
    disableYearSelection: false,
    firstDayOfWeek: 1,
    style: {},
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    date: undefined,
    keyboardActivated: false,
  };

  componentWillMount() {

    this.setState({
      date: this.isControlled() ? this.getControlledDate() : this.props.defaultDate,
    });
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.input);
    node.addEventListener('touchstart', this.handleClick);
    node.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this.refs.input);
    node.removeEventListener('touchstart', this.handleClick);
    node.removeEventListener('click', this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled()) {
      const newDate = this.getControlledDate(nextProps);
      if (!isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate,
        });
      }
    }
  }

  getDate() {
    return this.state.date instanceof Date ? this.state.date : undefined;
  }

  /**
   * Open the date-picker dialog programmatically from a parent.
   */
  openDialog() {
    /**
     * if the date is not selected then set it to new date
     * (get the current system date while doing so)
     * else set it to the currently selected date
     */
    if (this.shouldHandleKeyboard())
      this.refs.input.focus();

    if (this.state.date !== undefined) {
      this.setState({
        dialogDate: this.getDate(),
      }, this.refs.dialogWindow.show);
    } else {
      this.setState({
        dialogDate: new Date(),
      }, this.refs.dialogWindow.show);
    }
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  shouldHandleKeyboard = () => {
    return this.props.keyboardEnabled &&
      !this.props.disabled &&
      this.props.container === 'inline';
  }

  handleAccept = (date) => {
    if (!this.isControlled()) {
      this.setState({
        date: date,
        keyboardActivated: false
      });
    }
    if (this.props.onChange) {
      this.props.onChange(null, date);
    }
  };

  handleInputFocus = (event) => {
    if (this.shouldHandleKeyboard()) {
      this.setState({keyboardActivated: true}, this.focus);
    } else {
      event.target.blur();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleInputBlur = () => {
    var tmpDate = this.state.date instanceof Date ? this.state.date : undefined;
    this.handleAccept(tmpDate);
  }

  handleKeyDown = (event) => {
    if (!this.shouldHandleKeyboard)
      return;

    const key = keycode(event);
    switch (key) {
      case 'tab':
        if (this.state.keyboardActivated)
          this.setState({keyboardActivated: false}, this.refs.dialogWindow.dismiss);
        break;
      case 'right':
      case 'left':
      case 'up':
      case 'down':
        event.stopPropagation();
        break;
    }
  }

  handleKeyUp = (event) => {
    if (!this.shouldHandleKeyboard)
      return;

    const key = keycode(event);
    switch (key) {
      case 'enter':
        if (this.refs.dialogWindow.state.open) {
          event.stopPropagation();
          event.preventDefault();
          this.refs.dialogWindow.dismiss();
        }
        break;
    }
  }

  handleInputChange = (event) => {
    if (!this.refs.dialogWindow.state.open) {
      this.refs.dialogWindow.show();
    }

    const filtered = event.target.value.replace(/[^0-9\-\/]/gi, '').replace('/', '-');
    let dt = undefined;
    if (filtered.length === 10) {
      // we split this manually as Date.parse is implementation specific
      // and also because it doesn't use the browser's timezone.
      const parts = filtered.split('-');
      if (parts.length === 3)
        dt = new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0 based
    }

    this.setState({
      date: !dt || isNaN(dt.getTime()) ? filtered : dt,
    });
  }

  handleClick = (event) => {
    if (this.shouldHandleKeyboard() && this.refs.dialogWindow.state.open) {
      event.stopPropagation();
      return;
    } 
  }

  handleTouchTap = (event) => {
    if (this.shouldHandleKeyboard() && this.refs.dialogWindow.state.open) {
      event.stopPropagation();
      event.preventDefault();
      return;
    } 

    if (this.props.onTouchTap) {
      this.props.onTouchTap(event);
    }

    if (!this.props.disabled) {
      setTimeout(() => {
        this.openDialog();
      }, 0);
    }
    
  };

  isControlled() {
    return this.props.hasOwnProperty('value');
  }

  getControlledDate(props = this.props) {
    if (props.value instanceof Date) {
      return props.value;
    }
  }

  formatDate = (date) => {
    if (this.props.locale) {
      const DateTimeFormat = this.props.DateTimeFormat || dateTimeFormat;
      return new DateTimeFormat(this.props.locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(date);
    } else {
      return formatIso(date);
    }
  };

  render() {
    const {
      DateTimeFormat,
      autoOk,
      cancelLabel,
      className,
      container,
      defaultDate, // eslint-disable-line no-unused-vars
      dialogContainerStyle,
      disableYearSelection,
      keyboardEnabled,
      firstDayOfWeek,
      formatDate: formatDateProp,
      locale,
      maxDate,
      minDate,
      mode,
      okLabel,
      onDismiss,
      onFocus, // eslint-disable-line no-unused-vars
      onShow,
      onTouchTap, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      style,
      textFieldStyle,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const formatDate = formatDateProp || this.formatDate;
    const rawDate = this.state.date instanceof Date ?
      formatDate(this.state.date) :
      this.state.date;
    const inputError = rawDate !== undefined && !(this.state.date instanceof Date) ?
      'Enter a valid date' :
      this.props.errorText;
    const hintText = keyboardEnabled && this.state.keyboardActivated ? 'yyyy-mm-dd' : this.props.hintText;

    return (
      <div ref="root" className={className} style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onTouchTap={this.handleTouchTap}
          tabIndex={this.shouldHandleKeyboard() ? 0 : 1}
          onChange={this.handleInputChange}
          ref="input"
          style={textFieldStyle}
          value={rawDate ? rawDate : ''}
          errorText={inputError}
          hintText={hintText}
        />
        <DatePickerDialog
          DateTimeFormat={DateTimeFormat}
          autoOk={autoOk}
          useLayerForClickAway={!this.shouldHandleKeyboard()}
          anchorEl={this.refs.root}
          cancelLabel={cancelLabel}
          container={container}
          containerStyle={dialogContainerStyle}
          disableYearSelection={disableYearSelection}
          firstDayOfWeek={firstDayOfWeek}
          initialDate={this.state.dialogDate}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          mode={mode}
          okLabel={okLabel}
          onAccept={this.handleAccept}
          onShow={onShow}
          onDismiss={onDismiss}
          ref="dialogWindow"
          shouldDisableDate={shouldDisableDate}
        />
      </div>
    );
  }
}

export default DatePicker;
