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

    this.dismiss();
  };

  handleKeyUp = (event) => { // FIXME: Unused function
    switch (keycode(event)) {
      case 'enter':
        this.handleTouchTapOk();
        break;
    }
  };

  render() {
    const {
      // autoOk, FIXME: autoOk not working
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
          animation={PopoverAnimationFromTop} // For Popover
          anchorEl={this.refs.root} // For Popover
          contentStyle={styles.dialogContent}
          bodyStyle={styles.dialogBodyContent}
          ref="dialog"
          repositionOnUpdate={false}
          onRequestClose={this.handleRequestClose}
          open={open}
        >
          <EventListener
            elementName="window"
            onKeyUp={this.handleWindowKeyUp}
          />
          <Calendar
            DateTimeFormat={DateTimeFormat}
            firstDayOfWeek={firstDayOfWeek}
            locale={locale}
            ref="calendar"
            onTouchTapDay={this.handleTouchTapDay}
            initialDate={initialDate}
            open={open}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={shouldDisableDate}
            disableYearSelection={disableYearSelection}
            mode={mode}
            onTouchTapCancel={this.handleTouchTapCancel}
            onTouchTapOk={this.handleTouchTapOk}
            okLabel={okLabel}
            cancelLabel={cancelLabel}
            wordings={wordings}
            showActionButtons={true}
          />
        </Container>
      </div>
    );
  }
}

export default DatePickerDialog;
