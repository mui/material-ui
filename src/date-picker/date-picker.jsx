import React from 'react';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';
import DateTime from '../utils/date-time';
import DatePickerDialog from './date-picker-dialog';
import TextField from '../text-field';
import ThemeManager from '../styles/theme-manager';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';

const DatePicker = React.createClass({

  mixins: [
    StylePropable,
    WindowListenable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    DateTimeFormat: React.PropTypes.func,
    autoOk: React.PropTypes.bool,
    container: React.PropTypes.oneOf(['dialog', 'inline']),
    defaultDate: React.PropTypes.object,
    formatDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    onChange: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    showYearSelector: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    textFieldStyle: React.PropTypes.object,
    value: React.PropTypes.any,
    valueLink: React.PropTypes.object,
    wordings: React.PropTypes.object,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
  },

  getDefaultProps() {
    return {
      formatDate: DateTime.format,
      autoOk: false,
      showYearSelector: false,
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
      showYearSelector,
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

});

export default DatePicker;
