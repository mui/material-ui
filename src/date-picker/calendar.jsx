import React from 'react';
import EventListener from 'react-event-listener';
import DateTime from '../utils/date-time';
import keycode from 'keycode';
import Transitions from '../styles/transitions';
import CalendarMonth from './calendar-month';
import CalendarYear from './calendar-year';
import CalendarToolbar from './calendar-toolbar';
import DateDisplay from './date-display';
import SlideInTransitionGroup from '../transition-groups/slide-in';
import ClearFix from '../clearfix';
import getMuiTheme from '../styles/getMuiTheme';

const daysArray = [...Array(7)];

const Calendar = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    disableYearSelection: React.PropTypes.bool,
    firstDayOfWeek: React.PropTypes.number,
    initialDate: React.PropTypes.object,
    locale: React.PropTypes.string.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    mode: React.PropTypes.oneOf(['portrait', 'landscape']),
    onDayTouchTap: React.PropTypes.func,
    open: React.PropTypes.bool,
    shouldDisableDate: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disableYearSelection: false,
      initialDate: new Date(),
      minDate: DateTime.addYears(new Date(), -100),
      maxDate: DateTime.addYears(new Date(), 100),
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      displayMonthDay: true,
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      transitionEnter: true,
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const muiTheme = nextContext.muiTheme || this.state.muiTheme;

    if (nextProps.initialDate !== this.props.initialDate) {
      const d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }

    this.setState({muiTheme});
  },

  _yearSelector() {
    if (this.props.disableYearSelection) return;

    return (
      <CalendarYear
        key={'years'}
        displayDate={this.state.displayDate}
        onYearTouchTap={this._handleYearTouchTap}
        selectedDate={this.state.selectedDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
      />
    );
  },

  getSelectedDate() {
    return this.state.selectedDate;
  },

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  },

  _addSelectedDays(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _addSelectedYears(years) {
    this._setSelectedDate(DateTime.addYears(this.state.selectedDate, years));
  },

  _setDisplayDate(d, newSelectedDate) {
    const newDisplayDate = DateTime.getFirstDayOfMonth(d);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  },

  _setSelectedDate(date) {
    let adjustedDate = date;
    if (DateTime.isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (DateTime.isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    const newDisplayDate = DateTime.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  },

  _handleDayTouchTap(event, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(event, date);
  },

  _handleMonthChange(months) {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: DateTime.addMonths(this.state.displayDate, months),
    });
  },

  _handleYearTouchTap(event, year) {
    const date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, event);
  },

  _getToolbarInteractions() {
    return {
      prevMonth: DateTime.monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: DateTime.monthDiff(this.state.displayDate, this.props.maxDate) < 0,
    };
  },

  _handleMonthDayClick() {
    this.setState({
      displayMonthDay: true,
    });
  },

  _handleYearClick() {
    this.setState({
      displayMonthDay: false,
    });
  },

  _handleWindowKeyDown(event) {
    if (this.props.open) {
      switch (keycode(event)) {
        case 'up':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(-1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case 'down':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case 'right':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case 'left':
          if (event.altKey && event.shiftKey) {
            this._addSelectedYears(-1);
          } else if (event.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  },

  render() {
    const {
      prepareStyles,
    } = this.state.muiTheme;

    const yearCount = DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    const weekCount = DateTime.getWeekArray(this.state.displayDate, this.props.firstDayOfWeek).length;
    const toolbarInteractions = this._getToolbarInteractions();
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
        transition: Transitions.easeOut('150ms', 'height'),
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
          onKeyDown={this._handleWindowKeyDown}
        />
        <DateDisplay
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          disableYearSelection={this.props.disableYearSelection}
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          handleMonthDayClick={this._handleMonthDayClick}
          handleYearClick={this._handleYearClick}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount}
        />
        {this.state.displayMonthDay &&
          <div style={prepareStyles(styles.calendarContainer)}>
            <CalendarToolbar
              DateTimeFormat={DateTimeFormat}
              locale={locale}
              displayDate={this.state.displayDate}
              onMonthChange={this._handleMonthChange}
              prevMonth={toolbarInteractions.prevMonth}
              nextMonth={toolbarInteractions.nextMonth}
            />
            <ClearFix
              elementType="ul"
              style={styles.weekTitle}
            >
              {daysArray.map((event, i) => (
                <li key={i} style={weekTitleDayStyle}>
                  {DateTime.localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                </li>
              ))}
            </ClearFix>
            <SlideInTransitionGroup direction={this.state.transitionDirection}>
              <CalendarMonth
                key={this.state.displayDate.toDateString()}
                ref="calendar"
                displayDate={this.state.displayDate}
                onDayTouchTap={this._handleDayTouchTap}
                selectedDate={this.state.selectedDate}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                shouldDisableDate={this.props.shouldDisableDate}
                firstDayOfWeek={this.props.firstDayOfWeek}
              />
            </SlideInTransitionGroup>
          </div>
        }
        {!this.state.displayMonthDay &&
          <div style={prepareStyles(styles.yearContainer)}>
            {this._yearSelector()}
          </div>
        }
      </ClearFix>
    );
  },

});

export default Calendar;
