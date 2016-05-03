import React, {Component, PropTypes} from 'react';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import CalendarToolbar from './CalendarToolbar';
import DateDisplay from './DateDisplay';
import SlideInTransitionGroup from '../internal/SlideIn';
import ClearFix from '../internal/ClearFix';

import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  isAfterDate,
  isBeforeDate,
  getWeekArray,
  getFirstDayOfMonth,
  localizedWeekday,
  monthDiff,
  yearDiff,
} from './dateUtils';

import Clock from '../TimePicker/Clock';

const daysArray = [...Array(7)];

class Calendar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    initialDate: PropTypes.object,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    onDayTouchTap: PropTypes.func,
    open: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    timeAware: PropTypes.bool,
    timeFormat: PropTypes.oneOf(['ampm', '24hr']),
  };

  static defaultProps = {
    disableYearSelection: false,
    timeAware: false,
    initialDate: new Date(),
    minDate: addYears(new Date(), -100),
    maxDate: addYears(new Date(), 100),
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    timeActive: false,
    dateActive: true,
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
      const d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }
  }

  timeSelector() {
    this.setState({
      timeActive: true,
      dateActive: false,
    });
  }

  setTime(time) {
    const newDate = this.state.selectedDate;
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getHours());
    newDate.setSeconds(time.getSeconds());
    this.setState({
      selectedDate: newDate,
    });
  }

  yearSelector() {
    if (this.props.disableYearSelection) return;

    return (
      <CalendarYear
        key={'years'}
        displayDate={this.state.displayDate}
        onYearTouchTap={this.handleYearTouchTap}
        selectedDate={this.state.selectedDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
      />
    );
  }

  getSelectedDate() {
    return this.state.selectedDate;
  }

  isSelectedDateDisabled() {
    if (this.refs.calendar && this.state.displayMonthDay ) {
      return this.refs.calendar.isSelectedDateDisabled();
    }
    return false;
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

  setDisplayDate(d, newSelectedDate) {
    const newDisplayDate = getFirstDayOfMonth(d);
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

  handleDayTouchTap = (event, date) => {
    this.setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(event, date);
  };

  handleMonthChange = (months) => {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: addMonths(this.state.displayDate, months),
    });
  };

  handleYearTouchTap = (event, year) => {
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

  handleTouchTapMonthDay = () => {
    this.setState({
      displayMonthDay: true,
      timeActive: false,
      dateActive: true,
    });
  };

  handleTouchTapClick = () => {
    this.setState({
      displayMonthDay: false,
      timeActive: false,
      dateActive: true,
    });
  };

  handleKeyDown = (event) => {
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

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const yearCount = yearDiff(this.props.maxDate, this.props.minDate) + 1;
    const weekCount = getWeekArray(this.state.displayDate, this.props.firstDayOfWeek).length;
    const toolbarInteractions = this.getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const styles = {
      root: {
        fontSize: 12,
      },
      calendarContainer: {
        width: isLandscape ? 320 : '100%',
        height: weekCount === 5 ? 284 :
          weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
        transition: transitions.easeOut('150ms', 'height'),
        overflow: 'hidden',
      },
      clockContainer: {
        width: 260,
        transition: transitions.easeOut('150ms', 'height'),
        overflow: 'hidden',
      },
      yearContainer: {
        width: 280,
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 :
          weekCount === 5 ? 284 :
          weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
      },
      dateDisplay: {
        width: isLandscape ? 120 : '',
        height: isLandscape ?
          weekCount === 5 ? 238 :
          weekCount === 6 ? 278 :
          198 : 'auto',
        float: isLandscape ? 'left' : 'none',
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: 12,
        fontWeight: '500',
        margin: 0,
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: 37,
        textAlign: 'center',
        margin: '0 2px',
      },
    };

    const weekTitleDayStyle = prepareStyles(styles.weekTitleDay);
    const {
      DateTimeFormat,
      locale,
      firstDayOfWeek,
    } = this.props;

    return (
      <ClearFix style={styles.root}>
        <EventListener
          elementName="window"
          onKeyDown={this.handleKeyDown}
        />
        <DateDisplay
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          disableYearSelection={this.props.disableYearSelection}
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          onTouchTapMonthDay={this.handleTouchTapMonthDay}
          onTouchTapYear={this.handleTouchTapClick}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount}
        />
        {this.props.timeAware && this.props.mode !== 'landscape' && (
          <Clock
            ref="clock"
            onTouchTap={this.timeSelector.bind(this)}
            hideSelector={!this.state.timeActive}
            initialTime={this.props.initialDate}
            onChangeMinutes={this.setTime.bind(this)}
            onChangeHours={this.setTime.bind(this)}
            containerStyle={prepareStyles(styles.clockContainer)}
            format={this.props.timeFormat}
          />
        )}
        {this.state.dateActive && this.state.displayMonthDay &&
          <div style={prepareStyles(styles.calendarContainer)}>
            <CalendarToolbar
              DateTimeFormat={DateTimeFormat}
              locale={locale}
              displayDate={this.state.displayDate}
              onMonthChange={this.handleMonthChange}
              prevMonth={toolbarInteractions.prevMonth}
              nextMonth={toolbarInteractions.nextMonth}
            />
            <ClearFix
              elementType="ul"
              style={styles.weekTitle}
            >
              {daysArray.map((event, i) => (
                <li key={i} style={weekTitleDayStyle}>
                  {localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                </li>
              ))}
            </ClearFix>
            <SlideInTransitionGroup direction={this.state.transitionDirection}>
              <CalendarMonth
                key={this.state.displayDate.toDateString()}
                ref="calendar"
                displayDate={this.state.displayDate}
                onDayTouchTap={this.handleDayTouchTap}
                selectedDate={this.state.selectedDate}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                shouldDisableDate={this.props.shouldDisableDate}
                firstDayOfWeek={this.props.firstDayOfWeek}
              />
            </SlideInTransitionGroup>
          </div>
        }
        {this.state.dateActive && !this.state.displayMonthDay &&
          <div style={prepareStyles(styles.yearContainer)}>
            {this.yearSelector()}
          </div>
        }
      </ClearFix>
    );
  }
}

export default Calendar;
