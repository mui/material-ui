import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Calendar from './Calendar';
import Dialog from '../Dialog';
import DatePickerInline from './DatePickerInline';
import FlatButton from '../FlatButton';
import {dateTimeFormat} from './dateUtils';

class DatePickerDialog extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    container: PropTypes.oneOf(['dialog', 'inline']),
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    initialDate: PropTypes.object,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    wordings: PropTypes.object,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    container: 'dialog',
    locale: 'en-US',
    okLabel: 'OK',
    cancelLabel: 'Cancel',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  show = () => {
    if (this.props.onShow && !this.state.open) this.props.onShow();
    this.setState({
      open: true,
    });
  };

  dismiss = () => {
    if (this.props.onDismiss && this.state.open) this.props.onDismiss();
    this.setState({
      open: false,
    });
  }

  handleTouchTapDay = () => {
    if (this.props.autoOk) {
      setTimeout(this.handleTouchTapOK, 300);
    }
  };

  handleTouchTapCancel = () => {
    this.dismiss();
  };

  handleRequestClose = () => {
    this.dismiss();
  };

  handleTouchTapOK = () => {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  };

  handleKeyUp = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOK();
        break;
    }
  };

  render() {
    const {
      DateTimeFormat,
      cancelLabel,
      container,
      initialDate,
      firstDayOfWeek,
      locale,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      wordings,
      minDate,
      maxDate,
      shouldDisableDate,
      mode,
      disableYearSelection,
      ...other,
    } = this.props;

    const {open} = this.state;

    const {
      datePicker: {
        calendarTextColor,
      },
    } = this.context.muiTheme;

    const styles = {
      root: {
        fontSize: 14,
        color: calendarTextColor,
      },

      dialogContent: {
        width: mode === 'landscape' ? 480 : 320,
      },

      dialogBodyContent: {
        padding: 0,
      },

      actions: {
        marginRight: 8,
      },
    };

    const actions = [
      <FlatButton
        key={0}
        label={wordings ? wordings.cancel : cancelLabel}
        primary={true}
        style={styles.actions}
        onTouchTap={this.handleTouchTapCancel}
      />,
    ];

    if (!this.props.autoOk) {
      actions.push(
        <FlatButton
          key={1}
          label={wordings ? wordings.ok : okLabel}
          primary={true}
          disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
          style={styles.actions}
          onTouchTap={this.handleTouchTapOK}
        />
      );
    }

    // will change later when Popover is available.
    const Container = (container === 'inline' ? DatePickerInline : Dialog);
    return (
      <Container
        {...other}
        ref="dialog"
        style={styles.root}
        contentStyle={styles.dialogContent}
        bodyStyle={styles.dialogBodyContent}
        actions={actions}
        repositionOnUpdate={false}
        open={open}
        onRequestClose={this.handleRequestClose}
      >
        {open &&
          <EventListener
            elementName="window"
            onKeyUp={this.handleKeyUp}
          />
        }
        {open &&
          <Calendar
            DateTimeFormat={DateTimeFormat}
            firstDayOfWeek={firstDayOfWeek}
            locale={locale}
            ref="calendar"
            onDayTouchTap={this.handleTouchTapDay}
            initialDate={initialDate}
            open={true}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={shouldDisableDate}
            disableYearSelection={disableYearSelection}
            mode={mode}
          />
        }
      </Container>
    );
  }
}

export default DatePickerDialog;
