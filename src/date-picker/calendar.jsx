import React from 'react';
import StylePropable from '../mixins/style-propable';
import WindowListenable from '../mixins/window-listenable';
import DateTime from '../utils/date-time';
import KeyCode from '../utils/key-code';
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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    WindowListenable,
  ],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (nextProps.initialDate !== this.props.initialDate) {
      let d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }
  },

  windowListeners: {
    keydown: '_handleWindowKeyDown',
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
    let newDisplayDate = DateTime.getFirstDayOfMonth(d);
    let direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

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

    let newDisplayDate = DateTime.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  },

  _handleDayTouchTap(e, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _handleMonthChange(months) {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: DateTime.addMonths(this.state.displayDate, months),
    });
  },

  _handleYearTouchTap(e, year) {
    let date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
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

  _handleWindowKeyDown(e) {
    if (this.props.open) {

      switch (e.keyCode) {
        case KeyCode.UP:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          } else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  },

  render() {
    let yearCount = DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    let weekCount = DateTime.getWeekArray(this.state.displayDate, this.props.firstDayOfWeek).length;
    let toolbarInteractions = this._getToolbarInteractions();
    let isLandscape = this.props.mode === 'landscape';
    let styles = {
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

    const weekTitleDayStyle = this.prepareStyles(styles.weekTitleDay);
    const {
      DateTimeFormat,
      locale,
      firstDayOfWeek,
    } = this.props;

    return (
      <ClearFix style={this.mergeStyles(styles.root)}>
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
          <div style={this.prepareStyles(styles.calendarContainer)}>
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
              {daysArray.map((e, i) => (
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
          <div style={this.prepareStyles(styles.yearContainer)}>
            {this._yearSelector()}
          </div>
        }
      </ClearFix>
    );
  },

});

export default Calendar;
