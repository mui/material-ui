import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import CalendarActionButtons from './CalendarActionButtons';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import CalendarToolbar from './CalendarToolbar';
import DateDisplay from './DateDisplay';
import SlideInTransitionGroup from '../internal/SlideIn';

import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  dateTimeFormat,
  isAfterDate,
  isBeforeDate,
  getWeekArray,
  getFirstDayOfMonth,
  localizedWeekday,
  monthDiff,
} from './dateUtils';

const daysArray = [...Array(7)];

class Calendar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    initialDate: PropTypes.object,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapDay: PropTypes.func,
    onTouchTapOk: PropTypes.func,
    open: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    disableYearSelection: false,
    initialDate: new Date(),
    locale: 'en-US',
    minDate: addYears(new Date(), -100),
    maxDate: addYears(new Date(), 100),
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    displayDate: undefined,
    displayMonthDay: true,
    selectedDate: undefined,
    transitionDirection: 'left',
    transitionEnter: true,
  };

  componentWillMount() {
    this.setState({
      displayDate: getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      const date = nextProps.initialDate || new Date();
      this.setState({
        displayDate: getFirstDayOfMonth(date),
        selectedDate: date,
      });
    }
  }

  getSelectedDate() {
    return this.state.selectedDate;
  }

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  }

  addSelectedDays(days) {
    this.setSelectedDate(addDays(this.state.selectedDate, days));
  }

  addSelectedMonths(months) {
    this.setSelectedDate(addMonths(this.state.selectedDate, months));
  }

  addSelectedYears(years) {
    this.setSelectedDate(addYears(this.state.selectedDate, years));
  }

  setDisplayDate(date, newSelectedDate) {
    const newDisplayDate = getFirstDayOfMonth(date);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  }

  setSelectedDate(date) {
    let adjustedDate = date;
    if (isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    const newDisplayDate = getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this.setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  }

  handleTouchTapDay = (event, date) => {
    this.setSelectedDate(date);
    if (this.props.onTouchTapDay) this.props.onTouchTapDay(event, date);
  };

  handleMonthChange = (months) => {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: addMonths(this.state.displayDate, months),
    });
  };

  handleTouchTapYear = (event, year) => {
    const date = cloneDate(this.state.selectedDate);
    date.setFullYear(year);
    this.setSelectedDate(date, event);
  };

  getToolbarInteractions() {
    return {
      prevMonth: monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: monthDiff(this.state.displayDate, this.props.maxDate) < 0,
    };
  }

  handleTouchTapDateDisplayMonthDay = () => {
    this.setState({
      displayMonthDay: true,
    });
  };

  handleTouchTapDateDisplayYear = () => {
    this.setState({
      displayMonthDay: false,
    });
  };

  handleWindowKeyDown = (event) => {
    if (this.props.open) {
      switch (keycode(event)) {
        case 'up':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
          } else {
            this.addSelectedDays(-7);
          }
          break;

        case 'down':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
          } else {
            this.addSelectedDays(7);
          }
          break;

        case 'right':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
          } else {
            this.addSelectedDays(1);
          }
          break;

        case 'left':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
          } else {
            this.addSelectedDays(-1);
          }
          break;
      }
    }
  };

  yearSelector() {
    if (!this.props.disableYearSelection) return (
      <CalendarYear
        key={'years'}
        displayDate={this.state.displayDate}
        onTouchTapYear={this.handleTouchTapYear}
        selectedDate={this.state.selectedDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
      />
    );
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const weekCount = getWeekArray(this.state.displayDate, this.props.firstDayOfWeek).length;
    const toolbarInteractions = this.getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const {calendarTextColor} = this.context.muiTheme.datePicker;

    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        width: isLandscape ? 479 : 310,
      },
      calendar: {
        display: 'flex',
        flexDirection: 'column',
      },
      calendarContainer: {
        display: 'flex',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontSize: 12,
        fontWeight: 400,
        padding: '0px 8px',
        transition: transitions.easeOut(),
      },
      yearContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
        width: 310,
      },
      weekTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '500',
        height: 20,
        lineHeight: '15px',
        opacity: '0.5',
        textAlign: 'center',
      },
      weekTitleDay: {
        width: 42,
      },
      transitionSlide: {
        height: 214,
      },
    };

    const weekTitleDayStyle = prepareStyles(styles.weekTitleDay);

    const {
      cancelLabel,
      DateTimeFormat,
      firstDayOfWeek,
      locale,
      okLabel,
      onTouchTapCancel, // eslint-disable-line no-unused-vars
      onTouchTapOk, // eslint-disable-line no-unused-vars
    } = this.props;

    return (
      <div style={prepareStyles(styles.root)}>
        <EventListener
          target="window"
          onKeyDown={this.handleWindowKeyDown}
        />
        <DateDisplay
          DateTimeFormat={DateTimeFormat}
          disableYearSelection={this.props.disableYearSelection}
          onTouchTapMonthDay={this.handleTouchTapDateDisplayMonthDay}
          onTouchTapYear={this.handleTouchTapDateDisplayYear}
          locale={locale}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          selectedDate={this.state.selectedDate}
          weekCount={weekCount}
        />
        <div style={prepareStyles(styles.calendar)}>
          {this.state.displayMonthDay &&
            <div style={prepareStyles(styles.calendarContainer)}>
              <CalendarToolbar
                DateTimeFormat={DateTimeFormat}
                locale={locale}
                displayDate={this.state.displayDate}
                onMonthChange={this.handleMonthChange}
                prevMonth={toolbarInteractions.prevMonth}
                nextMonth={toolbarInteractions.nextMonth}
              />
              <div style={prepareStyles(styles.weekTitle)}>
                {daysArray.map((event, i) => (
                  <span key={i} style={weekTitleDayStyle}>
                    {localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                  </span>
                ))}
              </div>
              <SlideInTransitionGroup direction={this.state.transitionDirection} style={styles.transitionSlide}>
                <CalendarMonth
                  displayDate={this.state.displayDate}
                  firstDayOfWeek={this.props.firstDayOfWeek}
                  key={this.state.displayDate.toDateString()}
                  minDate={this.props.minDate}
                  maxDate={this.props.maxDate}
                  onTouchTapDay={this.handleTouchTapDay}
                  ref="calendar"
                  selectedDate={this.state.selectedDate}
                  shouldDisableDate={this.props.shouldDisableDate}
                />
              </SlideInTransitionGroup>
            </div>
          }
          {!this.state.displayMonthDay &&
            <div style={prepareStyles(styles.yearContainer)}>
              {this.yearSelector()}
            </div>
          }
          {okLabel &&
            <CalendarActionButtons
              autoOk={this.props.autoOk}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onTouchTapCancel={onTouchTapCancel}
              onTouchTapOk={onTouchTapOk}
            />
          }
        </div>
      </div>
    );
  }
}

export default Calendar;
