import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
  defaultUtils,
  dateTimeFormat,
  isAfterDate,
  isBeforeDate,
  localizedWeekday,
} from './dateUtils';

const daysArray = [...Array(7)];

class Calendar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    hideCalendarDate: PropTypes.bool,
    initialDate: PropTypes.object,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onClickCancel: PropTypes.func,
    onClickDay: PropTypes.func,
    onClickOk: PropTypes.func,
    open: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    disableYearSelection: false,
    initialDate: new Date(),
    locale: 'en-US',
    utils: defaultUtils,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    displayDate: undefined,
    displayMonthDay: undefined,
    selectedDate: undefined,
    transitionDirection: 'left',
    transitionEnter: true,
  };

  componentWillMount() {
    this.setState({
      displayDate: this.props.utils.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      displayMonthDay: !this.props.openToYearSelection,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      const date = nextProps.initialDate || new Date();
      this.setState({
        displayDate: this.props.utils.getFirstDayOfMonth(date),
        selectedDate: date,
      });
    }
  }

  calendarRefs = {};

  getMinDate() {
    return this.props.minDate || this.props.utils.addYears(new Date(), -100);
  }

  getMaxDate() {
    return this.props.maxDate || this.props.utils.addYears(new Date(), 100);
  }

  getSelectedDate() {
    return this.state.selectedDate;
  }

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    if (this.calendarRefs.calendar) {
      return this.calendarRefs.calendar.isSelectedDateDisabled();
    } else {
      return false;
    }
  }

  addSelectedDays(days) {
    this.setSelectedDate(this.props.utils.addDays(this.state.selectedDate, days));
  }

  addSelectedMonths(months) {
    this.setSelectedDate(this.props.utils.addMonths(this.state.selectedDate, months));
  }

  addSelectedYears(years) {
    this.setSelectedDate(this.props.utils.addYears(this.state.selectedDate, years));
  }

  setDisplayDate(date, newSelectedDate) {
    const newDisplayDate = this.props.utils.getFirstDayOfMonth(date);

    if (newDisplayDate !== this.state.displayDate) {
      const nextDirection = this.context.muiTheme.isRtl ? 'right' : 'left';
      const prevDirection = this.context.muiTheme.isRtl ? 'left' : 'right';
      const direction = newDisplayDate > this.state.displayDate ? nextDirection : prevDirection;
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  }

  setSelectedDate(date) {
    let adjustedDate = date;
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    if (isBeforeDate(date, minDate)) {
      adjustedDate = minDate;
    } else if (isAfterDate(date, maxDate)) {
      adjustedDate = maxDate;
    }

    const newDisplayDate = this.props.utils.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this.setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  }

  handleClickDay = (event, date) => {
    this.setSelectedDate(date);
    if (this.props.onClickDay) this.props.onClickDay(event, date);
  };

  handleMonthChange = (months) => {
    const nextDirection = this.context.muiTheme.isRtl ? 'right' : 'left';
    const prevDirection = this.context.muiTheme.isRtl ? 'left' : 'right';
    const direction = months >= 0 ? nextDirection : prevDirection;
    this.setState({
      transitionDirection: direction,
      displayDate: this.props.utils.addMonths(this.state.displayDate, months),
    });
  };

  handleClickYear = (event, year) => {
    this.setSelectedDate(this.props.utils.setYear(this.state.selectedDate, year), event);
    this.handleClickDateDisplayMonthDay();
  };

  getToolbarInteractions() {
    return {
      prevMonth: this.props.utils.monthDiff(this.state.displayDate, this.getMinDate()) > 0,
      nextMonth: this.props.utils.monthDiff(this.state.displayDate, this.getMaxDate()) < 0,
    };
  }

  handleClickDateDisplayMonthDay = () => {
    this.setState({
      displayMonthDay: true,
    });
  };

  handleClickDateDisplayYear = () => {
    this.setState({
      displayMonthDay: false,
    });
  };

  handleWindowKeyDown = (event) => {
    if (this.props.open) {
      const nextArrow = this.context.muiTheme.isRtl ? 'left' : 'right';
      const prevArrow = this.context.muiTheme.isRtl ? 'right' : 'left';
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

        case nextArrow:
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
          } else {
            this.addSelectedDays(1);
          }
          break;

        case prevArrow:
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
    if (!this.props.disableYearSelection) {
      return (
        <CalendarYear
          key="years"
          DateTimeFormat={this.props.DateTimeFormat}
          locale={this.props.locale}
          onClickYear={this.handleClickYear}
          selectedDate={this.state.selectedDate}
          minDate={this.getMinDate()}
          maxDate={this.getMaxDate()}
          utils={this.props.utils}
        />
      );
    }
  }

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const {hideCalendarDate} = this.props;
    const toolbarInteractions = this.getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const {calendarTextColor} = this.context.muiTheme.datePicker;

    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        width: (!hideCalendarDate && isLandscape) ? 479 : 310,
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
      onClickCancel, // eslint-disable-line no-unused-vars
      onClickOk, // eslint-disable-line no-unused-vars
      utils,
    } = this.props;

    return (
      <div style={prepareStyles(styles.root)}>
        <EventListener
          target="window"
          onKeyDown={this.handleWindowKeyDown}
        />
        {!hideCalendarDate &&
          <DateDisplay
            DateTimeFormat={DateTimeFormat}
            disableYearSelection={this.props.disableYearSelection}
            onClickMonthDay={this.handleClickDateDisplayMonthDay}
            onClickYear={this.handleClickDateDisplayYear}
            locale={locale}
            monthDaySelected={this.state.displayMonthDay}
            mode={this.props.mode}
            selectedDate={this.state.selectedDate}
          />
        }
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
                  DateTimeFormat={DateTimeFormat}
                  locale={locale}
                  displayDate={this.state.displayDate}
                  firstDayOfWeek={this.props.firstDayOfWeek}
                  key={this.state.displayDate.toDateString()}
                  minDate={this.getMinDate()}
                  maxDate={this.getMaxDate()}
                  onClickDay={this.handleClickDay}
                  ref={(ref) => this.calendarRefs.calendar = ref}
                  selectedDate={this.state.selectedDate}
                  shouldDisableDate={this.props.shouldDisableDate}
                  utils={utils}
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
              onClickCancel={onClickCancel}
              onClickOk={onClickOk}
            />
          }
        </div>
      </div>
    );
  }
}

export default Calendar;
