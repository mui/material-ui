'use strict';

var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var Transitions = require('../styles/transitions');
var CalendarMonth = require('./calendar-month');
var CalendarYear = require('./calendar-year');
var CalendarToolbar = require('./calendar-toolbar');
var DateDisplay = require('./date-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in');
var ClearFix = require('../clearfix');

var Calendar = React.createClass({
  displayName: 'Calendar',

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    shouldShowMonthDayPickerFirst: React.PropTypes.bool,
    shouldShowYearPickerFirst: React.PropTypes.bool,
    showYearSelector: React.PropTypes.bool,
    onDayTouchTap: React.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialDate: new Date(),
      minDate: DateTime.addYears(new Date(), -100),
      maxDate: DateTime.addYears(new Date(), 100),
      hideToolbarYearChange: false,
      shouldShowMonthDayPickerFirst: true,
      shouldShowYearPickerFirst: false,
      showYearSelector: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      displayMonthDay: this.props.shouldShowMonthDayPickerFirst || this.props.shouldShowYearPickerFirst || true,
      transitionEnter: true
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }

    if (nextProps.shouldShowMonthDayPickerFirst) {
      this.setState({ displayMonthDay: nextProps.shouldShowMonthDayPickerFirst });
    }
  },

  render: function render() {
    var yearCount = DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var toolbarInteractions = this._getToolbarInteractions();
    var hideYearChangeButtons = this.props.hideToolbarYearChange || !this.props.showYearSelector;
    var isMultiYearRange = yearCount > 2; // Want a year range greater than 1. Ex. [2014,2016] has a count of 3
    var isLandscape = this.props.mode === 'landscape';
    var styles = {
      root: {
        fontSize: 12
      },
      calendarContainer: {
        width: isLandscape ? 280 : '100%',
        height: weekCount === 5 ? 268 : weekCount === 6 ? 308 : 228,
        float: isLandscape ? 'right' : 'none',
        transition: Transitions.easeOut('150ms', 'height'),
        overflow: 'hidden'
      },
      yearContainer: {
        width: 280,
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 : weekCount === 5 ? 268 : weekCount === 6 ? 308 : 228,
        float: isLandscape ? 'right' : 'none'
      },
      dateDisplay: {
        width: isLandscape ? 280 : '100%',
        height: '100%',
        float: isLandscape ? 'left' : 'none'
      },
      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: 12,
        fontWeight: '500',
        margin: 0
      },
      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: 32,
        textAlign: 'center',
        margin: '0 2px'
      }
    };

    if (this.state.displayMonthDay || !this.props.showYearSelector) {
      styles.yearContainer.display = 'none';
    } else {
      styles.calendarContainer.display = 'none';
    }

    return React.createElement(
      ClearFix,
      { style: this.mergeAndPrefix(styles.root) },
      React.createElement(DateDisplay, {
        style: styles.dateDisplay,
        selectedDate: this.state.selectedDate,
        handleMonthDayClick: this._handleMonthDayClick,
        handleYearClick: this._handleYearClick,
        yearSelectionAvailable: this.props.showYearSelector && isMultiYearRange,
        monthDaySelected: this.state.displayMonthDay,
        mode: this.props.mode,
        weekCount: weekCount }),
      React.createElement(
        'div',
        { style: styles.calendarContainer },
        React.createElement(CalendarToolbar, {
          displayDate: this.state.displayDate,
          onMonthChange: this._handleMonthChange,
          onYearChange: this._handleYearChange,
          prevMonth: toolbarInteractions.prevMonth,
          nextMonth: toolbarInteractions.nextMonth,
          prevYear: toolbarInteractions.prevYear,
          nextYear: toolbarInteractions.nextYear,
          hideYearChangeButtons: hideYearChangeButtons }),
        React.createElement(
          ClearFix,
          {
            elementType: 'ul',
            style: styles.weekTitle },
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'S'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'M'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'W'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'F'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'S'
          )
        ),
        React.createElement(
          SlideInTransitionGroup,
          {
            direction: this.state.transitionDirection },
          React.createElement(CalendarMonth, {
            key: this.state.displayDate.toDateString(),
            ref: 'calendar',
            displayDate: this.state.displayDate,
            onDayTouchTap: this._handleDayTouchTap,
            selectedDate: this.state.selectedDate,
            minDate: this.props.minDate,
            maxDate: this.props.maxDate,
            shouldDisableDate: this.props.shouldDisableDate })
        )
      ),
      React.createElement(
        'div',
        { style: styles.yearContainer },
        this._yearSelector()
      )
    );
  },

  _yearSelector: function _yearSelector() {
    if (this.props.showYearSelector) {
      return React.createElement(CalendarYear, {
        key: 'years',
        displayDate: this.state.displayDate,
        onYearTouchTap: this._handleYearTouchTap,
        selectedDate: this.state.selectedDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate });
    }
  },

  getSelectedDate: function getSelectedDate() {
    return this.state.selectedDate;
  },

  isSelectedDateDisabled: function isSelectedDateDisabled() {
    return this.refs.calendar.isSelectedDateDisabled();
  },

  _addSelectedDays: function _addSelectedDays(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function _addSelectedMonths(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },

  _addSelectedYears: function _addSelectedYears(years) {
    this._setSelectedDate(DateTime.addYears(this.state.selectedDate, years));
  },

  _setDisplayDate: function _setDisplayDate(d, newSelectedDate) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);
    var direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate
      });
    }
  },

  _setSelectedDate: function _setSelectedDate(date) {
    var adjustedDate = date;
    if (DateTime.isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (DateTime.isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    var newDisplayDate = DateTime.getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate
      });
    }
  },

  _handleDayTouchTap: function _handleDayTouchTap(e, date) {
    this._setSelectedDate(date);
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _handleMonthChange: function _handleMonthChange(months) {
    this._addSelectedMonths(months);
  },

  _handleYearChange: function _handleYearChange(years) {
    this._addSelectedYears(years);
  },

  _handleYearTouchTap: function _handleYearTouchTap(e, year) {
    var date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
  },

  _getToolbarInteractions: function _getToolbarInteractions() {
    return {
      prevMonth: DateTime.monthDiff(this.state.selectedDate, this.props.minDate) > 0,
      nextMonth: DateTime.monthDiff(this.state.selectedDate, this.props.maxDate) < 0,
      prevYear: DateTime.yearDiff(this.state.selectedDate, this.props.minDate) > 0,
      nextYear: DateTime.yearDiff(this.state.selectedDate, this.props.maxDate) < 0
    };
  },

  _handleMonthDayClick: function _handleMonthDayClick() {
    this.setState({ displayMonthDay: true });
  },

  _handleYearClick: function _handleYearClick() {
    this.setState({ displayMonthDay: false });
  },

  _handleWindowKeyDown: function _handleWindowKeyDown(e) {
    if (this.props.isActive) {

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
  }

});

module.exports = Calendar;