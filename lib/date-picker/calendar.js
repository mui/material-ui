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
var ThemeManager = require('../styles/theme-manager');
var DefaultRawTheme = require('../styles/raw-themes/light-raw-theme');

var Calendar = React.createClass({
  displayName: 'Calendar',

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    locale: React.PropTypes.string.isRequired,
    disableYearSelection: React.PropTypes.bool,
    initialDate: React.PropTypes.object,
    open: React.PropTypes.bool,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    onDayTouchTap: React.PropTypes.func,
    shouldDisableDate: React.PropTypes.func
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disableYearSelection: false,
      initialDate: new Date(),
      minDate: DateTime.addYears(new Date(), -100),
      maxDate: DateTime.addYears(new Date(), 100)
    };
  },

  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      displayMonthDay: true,
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      transitionEnter: true
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function render() {
    var yearCount = DateTime.yearDiff(this.props.maxDate, this.props.minDate) + 1;
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var toolbarInteractions = this._getToolbarInteractions();
    var isLandscape = this.props.mode === 'landscape';
    var styles = {
      root: {
        fontSize: 12
      },
      calendarContainer: {
        width: isLandscape ? 320 : '100%',
        height: weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none',
        transition: Transitions.easeOut('150ms', 'height'),
        overflow: 'hidden'
      },
      yearContainer: {
        width: 280,
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 : weekCount === 5 ? 284 : weekCount === 6 ? 324 : 244,
        float: isLandscape ? 'right' : 'none'
      },
      dateDisplay: {
        width: isLandscape ? 120 : '',
        height: isLandscape ? weekCount === 5 ? 238 : weekCount === 6 ? 278 : 198 : 'auto',
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
        width: 37,
        textAlign: 'center',
        margin: '0 2px'
      }
    };

    var weekTitleDayStyle = this.prepareStyles(styles.weekTitleDay);
    var _props = this.props;
    var DateTimeFormat = _props.DateTimeFormat;
    var locale = _props.locale;

    return React.createElement(
      ClearFix,
      { style: this.mergeStyles(styles.root) },
      React.createElement(DateDisplay, {
        DateTimeFormat: DateTimeFormat,
        locale: locale,
        disableYearSelection: this.props.disableYearSelection,
        style: styles.dateDisplay,
        selectedDate: this.state.selectedDate,
        handleMonthDayClick: this._handleMonthDayClick,
        handleYearClick: this._handleYearClick,
        monthDaySelected: this.state.displayMonthDay,
        mode: this.props.mode,
        weekCount: weekCount }),
      this.state.displayMonthDay && React.createElement(
        'div',
        { style: this.prepareStyles(styles.calendarContainer) },
        React.createElement(CalendarToolbar, {
          DateTimeFormat: DateTimeFormat,
          locale: locale,
          displayDate: this.state.displayDate,
          onMonthChange: this._handleMonthChange,
          prevMonth: toolbarInteractions.prevMonth,
          nextMonth: toolbarInteractions.nextMonth }),
        React.createElement(
          ClearFix,
          {
            elementType: 'ul',
            style: styles.weekTitle },
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'S'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'M'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'T'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'W'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'T'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
            'F'
          ),
          React.createElement(
            'li',
            { style: weekTitleDayStyle },
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
      !this.state.displayMonthDay && React.createElement(
        'div',
        { style: this.prepareStyles(styles.yearContainer) },
        this._yearSelector()
      )
    );
  },

  _yearSelector: function _yearSelector() {
    if (this.props.disableYearSelection) return;

    return React.createElement(CalendarYear, {
      key: 'years',
      displayDate: this.state.displayDate,
      onYearTouchTap: this._handleYearTouchTap,
      selectedDate: this.state.selectedDate,
      minDate: this.props.minDate,
      maxDate: this.props.maxDate });
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
    this.setState({ displayDate: DateTime.addMonths(this.state.displayDate, months) });
  },

  _handleYearTouchTap: function _handleYearTouchTap(e, year) {
    var date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date, e);
  },

  _getToolbarInteractions: function _getToolbarInteractions() {
    return {
      prevMonth: DateTime.monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: DateTime.monthDiff(this.state.displayDate, this.props.maxDate) < 0
    };
  },

  _handleMonthDayClick: function _handleMonthDayClick() {
    this.setState({
      displayMonthDay: true
    });
  },

  _handleYearClick: function _handleYearClick() {
    this.setState({
      displayMonthDay: false
    });
  },

  _handleWindowKeyDown: function _handleWindowKeyDown(e) {
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
  }

});

module.exports = Calendar;