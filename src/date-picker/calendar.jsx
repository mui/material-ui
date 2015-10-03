const React = require('react');
const StylePropable = require('../mixins/style-propable');
const WindowListenable = require('../mixins/window-listenable');
const DateTime = require('../utils/date-time');
const KeyCode = require('../utils/key-code');
const Transitions = require('../styles/transitions');
const CalendarMonth = require('./calendar-month');
const CalendarYear = require('./calendar-year');
const CalendarToolbar = require('./calendar-toolbar');
const DateDisplay = require('./date-display');
const SlideInTransitionGroup = require('../transition-groups/slide-in');
const ClearFix = require('../clearfix');


const Calendar = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    onDayTouchTap: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func,
    shouldShowMonthDayPickerFirst: React.PropTypes.bool,
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown',
  },

  getDefaultProps() {
    return {
      disableYearSelection: false,
      initialDate: new Date(),
      minDate: DateTime.addYears(new Date(), -100),
      maxDate: DateTime.addYears(new Date(), 100),
      shouldShowMonthDayPickerFirst: true,
    };
  },

  getInitialState() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      displayMonthDay: this.props.shouldShowMonthDayPickerFirst || true,
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      transitionEnter: true,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      let d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d,
      });
    }

    if (nextProps.shouldShowMonthDayPickerFirst) {
      this.setState({displayMonthDay: nextProps.shouldShowMonthDayPickerFirst});
    }
  },

  render() {
    let yearCount = DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    let weekCount = DateTime.getWeekArray(this.state.displayDate).length;
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
          198 : 64,
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

    if (this.state.displayMonthDay) {
      styles.yearContainer.display = 'none';
    }
    else {
      styles.calendarContainer.display = 'none';
    }

    return (
      <ClearFix style={this.mergeAndPrefix(styles.root)}>

        <DateDisplay
          disableYearSelection={this.props.disableYearSelection}
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          handleMonthDayClick={this._handleMonthDayClick}
          handleYearClick={this._handleYearClick}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount} />

        <div style={styles.calendarContainer}>
          <CalendarToolbar
            displayDate={this.state.displayDate}
            onMonthChange={this._handleMonthChange}
            prevMonth={toolbarInteractions.prevMonth}
            nextMonth={toolbarInteractions.nextMonth} />

          <ClearFix
            elementType="ul"
            style={styles.weekTitle}>
            <li style={styles.weekTitleDay}>S</li>
            <li style={styles.weekTitleDay}>M</li>
            <li style={styles.weekTitleDay}>T</li>
            <li style={styles.weekTitleDay}>W</li>
            <li style={styles.weekTitleDay}>T</li>
            <li style={styles.weekTitleDay}>F</li>
            <li style={styles.weekTitleDay}>S</li>
          </ClearFix>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarMonth
              key={this.state.displayDate.toDateString()}
              ref="calendar"
              displayDate={this.state.displayDate}
              onDayTouchTap={this._handleDayTouchTap}
              selectedDate={this.state.selectedDate}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              shouldDisableDate={this.props.shouldDisableDate} />
          </SlideInTransitionGroup>
        </div>

        <div style={styles.yearContainer}>
          {this._yearSelector()}
        </div>

      </ClearFix>
    );
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
        maxDate={this.props.maxDate} />
    );
  },

  getSelectedDate() {
    return this.state.selectedDate;
  },

  isSelectedDateDisabled() {
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
    }
    else if (DateTime.isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    let newDisplayDate = DateTime.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    }
    else {
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
    this.setState({displayDate: DateTime.addMonths(this.state.displayDate, months)});
  },

  _handleYearTouchTap(e, year) {
    let date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
  },

  _getToolbarInteractions() {
    return {
      prevMonth: DateTime.monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: DateTime.monthDiff(this.state.displayDate, this.props.maxDate) < 0
    };
  },

  _handleMonthDayClick() {
    this.setState({displayMonthDay: true});
  },

  _handleYearClick() {
    this.setState({displayMonthDay: false});
  },

  _handleWindowKeyDown(e) {
    if (this.props.isActive) {

      switch (e.keyCode) {
        case KeyCode.UP:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          }
          else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(1);
          }
          else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(1);
          }
          else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          }
          else {
            this._addSelectedDays(-1);
          }
          break;
      }
    }
  },

});

module.exports = Calendar;
