import React from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Calendar from './calendar';
import Dialog from '../dialog';
import DatePickerInline from './date-picker-inline';
import FlatButton from '../flat-button';
import getMuiTheme from '../styles/getMuiTheme';
import DateTime from '../utils/date-time';

const DatePickerDialog = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func,
    autoOk: React.PropTypes.bool,
    cancelLabel: React.PropTypes.string,
    container: React.PropTypes.oneOf(['dialog', 'inline']),
    disableYearSelection: React.PropTypes.bool,
    firstDayOfWeek: React.PropTypes.number,
    initialDate: React.PropTypes.object,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: React.PropTypes.string,
    onAccept: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    wordings: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      DateTimeFormat: DateTime.DateTimeFormat,
      container: 'dialog',
      locale: 'en-US',
      okLabel: 'OK',
      cancelLabel: 'Cancel',
    };
  },

  getInitialState() {
    return {
      open: false,
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
  },

  show() {
    if (this.props.onShow && !this.state.open) this.props.onShow();
    this.setState({
      open: true,
    });
  },

  dismiss() {
    if (this.props.onDismiss && this.state.open) this.props.onDismiss();
    this.setState({
      open: false,
    });
  },

  handleTouchTapDay() {
    if (this.props.autoOk) {
      setTimeout(this._handleOKTouchTap, 300);
    }
  },

  _handleCancelTouchTap() {
    this.dismiss();
  },

  _handleOKTouchTap() {
    if (this.props.onAccept && !this.refs.calendar.isSelectedDateDisabled()) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    this.dismiss();
  },

  _handleWindowKeyUp(event) {
    if (this.state.open) {
      switch (keycode(event)) {
        case 'enter':
          this._handleOKTouchTap();
          break;
      }
    }
  },

  render() {
    const {
      DateTimeFormat,
      cancelLabel,
      container,
      initialDate,
      firstDayOfWeek,
      locale,
      okLabel,
      onAccept,
      style,
      wordings,
      ...other,
    } = this.props;

    const {
      calendarTextColor,
    } = this.state.muiTheme.datePicker;

    const styles = {
      root: {
        fontSize: 14,
        color: calendarTextColor,
      },

      dialogContent: {
        width: this.props.mode === 'landscape' ? 480 : 320,
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
        onTouchTap={this._handleCancelTouchTap}
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
          onTouchTap={this._handleOKTouchTap}
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
        open={this.state.open}
        onRequestClose={this.dismiss}
      >
        <EventListener
          elementName="window"
          onKeyUp={this._handleWindowKeyUp}
        />
        <Calendar
          DateTimeFormat={DateTimeFormat}
          firstDayOfWeek={firstDayOfWeek}
          locale={locale}
          ref="calendar"
          onDayTouchTap={this.handleTouchTapDay}
          initialDate={this.props.initialDate}
          open={this.state.open}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          shouldDisableDate={this.props.shouldDisableDate}
          disableYearSelection={this.props.disableYearSelection}
          mode={this.props.mode}
        />
      </Container>
    );
  },

});

export default DatePickerDialog;
