import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Calendar from './Calendar';
import Dialog from '../Dialog';
import Popover from '../Popover/Popover';
import PopoverAnimationFromTop from '../Popover/PopoverAnimationVertical';
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
    open: PropTypes.bool,
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
  };

  handleTouchTapDay = () => {
    if (this.props.autoOk) {
      setTimeout(this.handleTouchTapOk, 300);
    }
  };

  handleTouchTapCancel = () => {
    this.dismiss();
  };

  handleRequestClose = () => {
    this.dismiss();
  };

  handleTouchTapOk = () => {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.setState({
      open: false,
    });
  };

  handleWindowKeyUp = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOk();
        break;
    }
  };

  render() {
    const {
      DateTimeFormat,
      cancelLabel,
      container,
      disableYearSelection,
      initialDate,
      firstDayOfWeek,
      locale,
      maxDate,
      minDate,
      mode,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      style, // eslint-disable-line no-unused-vars
      wordings,
      ...other,
    } = this.props;

    const {open} = this.state;

    const styles = {
      dialogContent: {
        width: mode === 'landscape' ? 479 : 310,
      },
      dialogBodyContent: {
        padding: 0,
        minHeight: mode === 'landscape' ? 330 : 434,
        minWidth: mode === 'landscape' ? 479 : 310,
      },
    };

    const Container = (container === 'inline' ? Popover : Dialog);
    return (
      <div {...other} ref="root">
        <Container
          {...other}
          anchorEl={this.refs.root} // For Popover
          animation={PopoverAnimationFromTop} // For Popover
          bodyStyle={styles.dialogBodyContent}
          contentStyle={styles.dialogContent}
          ref="dialog"
          repositionOnUpdate={true}
          open={open}
          onRequestClose={this.handleRequestClose}
          style={styles.dialogBodyContent}
        >
          <EventListener
            target="window"
            onKeyUp={this.handleWindowKeyUp}
          />
          <Calendar
            autoOk={this.props.autoOk}
            DateTimeFormat={DateTimeFormat}
            cancelLabel={cancelLabel}
            disableYearSelection={disableYearSelection}
            firstDayOfWeek={firstDayOfWeek}
            initialDate={initialDate}
            locale={locale}
            onTouchTapDay={this.handleTouchTapDay}
            maxDate={maxDate}
            minDate={minDate}
            mode={mode}
            open={open}
            ref="calendar"
            onTouchTapCancel={this.handleTouchTapCancel}
            onTouchTapOk={this.handleTouchTapOk}
            okLabel={okLabel}
            shouldDisableDate={shouldDisableDate}
            wordings={wordings}
          />
        </Container>
      </div>
    );
  }
}

export default DatePickerDialog;
