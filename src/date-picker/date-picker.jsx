import React from 'react';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';
import DateTime from '../utils/date-time';
import DatePickerDialog from './date-picker-dialog';
import TextField from '../text-field';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import deprecated from '../utils/deprecatedPropType';

const DatePicker = React.createClass({

  propTypes: {
    /**
     * Constructor for time formatting.
     * Follow this specificaction: ECMAScript Internationalization API 1.0 (ECMA-402).
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
     * This function is called to format the date to display in the input box.
     * By default, date objects are formatted to MM/DD/YYYY.
     */
    formatDate: React.PropTypes.func,

    /**
     * Locale used for formatting date. If you are not using the default value, you
     * have to provide a DateTimeFormat that supports it. You can use Intl.DateTimeFormat
     * if it's supported by your environment.
     * https://github.com/andyearnshaw/Intl.js is a good polyfill.
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
     * Fired when the datepicker dialog is dismissed.
     */
    onDismiss: React.PropTypes.func,

    /**
     * Callback function that is fired when the datepicker field gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Fired when the datepicker dialog is shown.
     */
    onShow: React.PropTypes.func,

    /**
     * Called when touch tap event occurs on text-field.
     */
    onTouchTap: React.PropTypes.func,

    /**
     * Called during render time of a given day. If this method returns
     * false the day is disabled otherwise it is displayed normally.
     */
    shouldDisableDate: React.PropTypes.func,

    /**
     *  Enables the year selection in the date picker.
     */
    showYearSelector: deprecated(React.PropTypes.bool,
          'Instead, use disableYearSelection.'),

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    WindowListenable,
  ],

  getDefaultProps() {
    return {
      formatDate: DateTime.format,
      autoOk: false,
      disableYearSelection: false,
      style: {},
    };
  },

  getInitialState() {
    return {
      date: this._isControlled() ? this._getControlledDate() : this.props.defaultDate,
      dialogDate: new Date(),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.muiTheme) {
      this.setState({muiTheme: nextContext.muiTheme});
    }

    if (this._isControlled()) {
      let newDate = this._getControlledDate(nextProps);
      if (!DateTime.isEqualDate(this.state.date, newDate)) {
        this.setState({
          date: newDate,
        });
      }
    }
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
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

  _handleInputFocus(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function _handleInputTouchTap(event) {
    if (this.props.onTouchTap) this.props.onTouchTap(event);

    setTimeout(() => {
      this.openDialog();
    }, 0);
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

  render() {
    let {
      container,
      DateTimeFormat,
      locale,
      wordings,
      autoOk,
      defaultDate,
      formatDate,
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
      ...other,
    } = this.props;

    return (
      <div style={this.prepareStyles(style)}>
        <TextField
          {...other}
          style={textFieldStyle}
          ref="input"
          value={this.state.date ? formatDate(this.state.date) : undefined}
          onFocus={this._handleInputFocus}
          onTouchTap={this._handleInputTouchTap}/>
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
          shouldDisableDate={this.props.shouldDisableDate}/>
      </div>

    );
  },

});

export default DatePicker;
