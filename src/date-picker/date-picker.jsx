import React from 'react';
import DateTime from '../utils/date-time';
import DatePickerDialog from './date-picker-dialog';
import TextField from '../text-field';
import getMuiTheme from '../styles/getMuiTheme';

const DatePicker = React.createClass({

  propTypes: {
    /**
     * Constructor for date formatting for the specified `locale`.
     * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
     * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
     * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
     */
    DateTimeFormat: React.PropTypes.func,

    /**
     * If true, automatically accept and close the picker on select a date.
     */
    autoOk: React.PropTypes.bool,

    /**
     * Used to control how the DatePicker will be displayed when a user tries to set a date.
     * `dialog` (default) displays the DatePicker as a dialog with a modal.
     * `inline` displays the DatePicker below the input field (similar to auto complete).
     */
    container: React.PropTypes.oneOf(['dialog', 'inline']),

    /**
     * This is the initial date value of the component.
     * If either `value` or `valueLink` is provided they will override this
     * prop with `value` taking precedence.
     */
    defaultDate: React.PropTypes.object,

    /**
     * Disables the year selection in the date picker.
     */
    disableYearSelection: React.PropTypes.bool,

    /**
     * Disables the DatePicker.
     */
    disabled: React.PropTypes.bool,

    /**
     * Used to change the first day of week. It varies from
     * Saturday to Monday between different locales.
     * The allowed range is 0 (Sunday) to 6 (Saturday).
     * The default is `1`, Monday, as per ISO 8601.
     */
    firstDayOfWeek: React.PropTypes.number,

    /**
     * This function is called to format the date displayed in the input box, and should return a string.
     * By default if no `locale` and `DateTimeFormat` is provided date objects are formatted to ISO 8601 YYYY-MM-DD.
     *
     * @param {object} date `Date` object to be formatted.
     */
    formatDate: React.PropTypes.func,

    /**
     * Locale used for formatting the dialog date strings. If you are not using the default value, you
     * have to provide a `DateTimeFormat` that supports it.
     */
    locale: React.PropTypes.string,

    /**
     * The ending of a range of valid dates. The range includes the endDate.
     * The default value is current date + 100 years.
     */
    maxDate: React.PropTypes.object,

    /**
     * The beginning of a range of valid dates. The range includes the startDate.
     * The default value is current date - 100 years.
     */
    minDate: React.PropTypes.object,

    /**
     * Tells the component to display the picker in portrait or landscape mode.
     */
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),

    /**
     * Callback function that is fired when the date value changes. Since there
     * is no particular event associated with the change the first argument
     * will always be null and the second argument will be the new Date instance.
     */
    onChange: React.PropTypes.func,

    /**
     * Fired when the Date Picker dialog is dismissed.
     */
    onDismiss: React.PropTypes.func,

    /**
     * Fired when the Date Picker field gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Fired when the Date Picker dialog is shown.
     */
    onShow: React.PropTypes.func,

    /**
     * Called when touch tap event occurs on text-field.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * Called during render time of a given day. If this method returns
     * false the day is disabled, otherwise it is displayed normally.
     */
    shouldDisableDate: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Override the inline-styles of DatePicker's TextField element.
     */
    textFieldStyle: React.PropTypes.object,

    /**
     * Sets the date for the Date Picker programmatically.
     */
    value: React.PropTypes.any,

    /**
     * Creates a ValueLink with the value of date picker.
     */
    valueLink: React.PropTypes.object,

    /**
     * Wordings used inside the button of the dialog.
     */
    wordings: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoOk: false,
      disableYearSelection: false,
      style: {},
      firstDayOfWeek: 1,
      disabled: false,
    };
  },

  getInitialState() {
    return {
      date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
      dialogDate: new Date(),
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if (this._isControlled()) {
      const newDate = this._getControlledDate(nextProps);
      if (!DateTime.isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate,
        });
      }
    }
  },

  getDate() {
    return this.state.date;
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

  _handleDialogAccept(date) {
    if (!this._isControlled()) {
      this.setState({
        date: date,
      });
    }
    if (this.props.onChange) this.props.onChange(null, date);
    if (this.props.valueLink) this.props.valueLink.requestChange(date);
  },

  _handleInputFocus(event) {
    event.target.blur();
    if (this.props.onFocus) this.props.onFocus(event);
  },

  _handleInputTouchTap: function _handleInputTouchTap(event) {
    if (this.props.onTouchTap) this.props.onTouchTap(event);

    if (!this.props.disabled)
      setTimeout(() => {
        this.openDialog();
      }, 0);
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

  _formatDate(date) {
    if (this.props.locale && this.props.DateTimeFormat) {
      return new this.props.DateTimeFormat(this.props.locale, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(date);
    } else {
      return DateTime.format(date);
    }
  },

  render() {
    const {
      container,
      DateTimeFormat,
      locale,
      wordings,
      autoOk,
      defaultDate,
      maxDate,
      minDate,
      mode,
      onDismiss,
      onFocus,
      onShow,
      onTouchTap,
      disableYearSelection,
      style,
      textFieldStyle,
      valueLink,
      firstDayOfWeek,
      ...other,
    } = this.props;

    const formatDate = this.props.formatDate || this._formatDate;
    const {prepareStyles} = this.state.muiTheme;

    return (
      <div style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={this.state.date ? formatDate(this.state.date) : undefined}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap}
        />
        <DatePickerDialog
          container={container}
          ref="dialogWindow"
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          wordings={wordings}
          mode={mode}
          initialDate={this.state.dialogDate}
          onAccept={this._handleDialogAccept}
          onShow={onShow}
          onDismiss={onDismiss}
          minDate={minDate}
          maxDate={maxDate}
          autoOk={autoOk}
          disableYearSelection={disableYearSelection}
          shouldDisableDate={this.props.shouldDisableDate}
          firstDayOfWeek={firstDayOfWeek}
        />
      </div>
    );
  },

});

export default DatePicker;
