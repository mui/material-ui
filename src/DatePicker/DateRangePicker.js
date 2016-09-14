import React, {Component, PropTypes} from 'react';
import {dateTimeFormat, formatIso} from './dateUtils';
import DatePickerDialog from './DatePickerDialog';
import TextField from '../TextField';

export default class DateRangePicker extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.oneOf(['dialog', 'inline']),
    defaultDate: PropTypes.object,
    dialogContainerStyle: PropTypes.object,
    disableYearSelection: PropTypes.bool,
    disabled: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    formatDate: PropTypes.func,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onChange: PropTypes.func,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
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
  };

  componentWillMount() {
    this.setState({
      date: this.isControlled() ? this.getControlledDate() : this.props.defaultDate,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.isControlled()) {
      const newDate = this.getControlledDate(nextProps);
      this.setState({
        date: newDate,
      });
    }
  }

  getDate() {
    return this.state.date;
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
    if (this.state.date !== undefined) {
      this.setState({
        dialogDate: this.getDate(),
      }, this.dialogWindow.show);
    } else {
      this.setState({
        dialogDate: new Date(),
      }, this.dialogWindow.show);
    }
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  handleAccept = (date) => {
    if (!this.isControlled()) {
      this.setState({
        date: date,
      });
    }
    if (this.props.onChange) {
      this.props.onChange(null, date);
    }
  };

  handleFocus = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleTouchTap = (event) => {
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
    if (props.value instanceof Object) {
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
    const format = formatDateProp || this.formatDate;
    const formatDate = (date) => {
      return `${format(date.start)} ${format(date.end)}`;
    };

    return (
      <div className={className} style={prepareStyles(Object.assign({}, style))}>
        <TextField
          {...other}
          onFocus={this.handleFocus}
          onTouchTap={this.handleTouchTap}
          ref={(ref) => {
            this.input = ref;
          }}
          style={textFieldStyle}
          value={this.state.date ? formatDate(this.state.date) : ''}
        />
        <DatePickerDialog
          DateTimeFormat={DateTimeFormat}
          autoOk={autoOk}
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
          range={true}
          ref={(ref) => {
            this.dialogWindow = ref;
          }}
          shouldDisableDate={shouldDisableDate}
        />
      </div>
    );
  }
}
