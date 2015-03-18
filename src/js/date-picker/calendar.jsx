var React = require('react');
var Classable = require('../mixins/classable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var CalendarMonth = require('./calendar-month');
var CalendarYear = require('./calendar-year');
var CalendarToolbar = require('./calendar-toolbar');
var DateDisplay = require('./date-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var Calendar = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date(),
      startDate: DateTime.addYears(new Date(), -100),
      endDate: DateTime.addYears(new Date(), 100),
      hideToolbarYearChange: false
    };
  },

  getInitialState: function() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      displayMonthDay: true,
      transitionEnter: true
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      var d = nextProps.initialDate || new Date();
      this.setState({
        displayDate: DateTime.getFirstDayOfMonth(d),
        selectedDate: d
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var classes = this.getClasses('mui-date-picker-calendar', {
      'mui-is-4week': weekCount === 4,
      'mui-is-5week': weekCount === 5,
      'mui-is-6week': weekCount === 6
    });
    var toolbarInteractions = this._getToolbarInteractions();
    var calendarContainerClass = "mui-date-picker-calendar-container";
    var yearContainerClass = "mui-date-picker-calendar-year-container";
    var isMultiYearRange = DateTime.yearDiff(this.props.endDate, this.props.startDate) > 1;
    
    if (this.state.displayMonthDay) {
      yearContainerClass = "hidden";
    }
    else {
      calendarContainerClass = "hidden";
    }

    return (
      <div className={classes}>

        <DateDisplay
          className="mui-date-picker-calendar-date-display"
          selectedDate={this.state.selectedDate}
          handleMonthDayClick={this._handleMonthDayClick}
          handleYearClick={this._handleYearClick}
          yearSelectionAvailable={isMultiYearRange}/>

        <div
          className={calendarContainerClass}>
          <CalendarToolbar
            displayDate={this.state.displayDate}
            onMonthChange={this._handleMonthChange}
            onYearChange={this._handleYearChange}
            disabledPrevMonth={!toolbarInteractions.prevMonth}
            disabledNextMonth={!toolbarInteractions.nextMonth}
            disabledPrevYear={!toolbarInteractions.prevYear}
            disabledNextYear={!toolbarInteractions.nextYear}
            hideYearChange={this.props.hideToolbarYearChange}/>

          <ul className="mui-date-picker-calendar-week-title">
            <li className="mui-date-picker-calendar-week-title-day">S</li>
            <li className="mui-date-picker-calendar-week-title-day">M</li>
            <li className="mui-date-picker-calendar-week-title-day">T</li>
            <li className="mui-date-picker-calendar-week-title-day">W</li>
            <li className="mui-date-picker-calendar-week-title-day">T</li>
            <li className="mui-date-picker-calendar-week-title-day">F</li>
            <li className="mui-date-picker-calendar-week-title-day">S</li>
          </ul>

          <SlideInTransitionGroup
            direction={this.state.transitionDirection}>
            <CalendarMonth
              key={this.state.displayDate.toDateString()}
              ref="calendar"
              displayDate={this.state.displayDate}
              onDayTouchTap={this._handleDayTouchTap}
              selectedDate={this.state.selectedDate}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              shouldDisableDate={this.props.shouldDisableDate} />
          </SlideInTransitionGroup>
        </div>
        
        <div
          className={yearContainerClass}>
          <CalendarYear
            key={'year-' + this.state.displayDate.toDateString()}
            displayDate={this.state.displayDate}
            onYearTouchTap={this._handleYearTouchTap}
            selectedDate={this.state.selectedDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
        </div>
      </div>
    );
  },

  getSelectedDate: function() {
    return this.state.selectedDate;
  },
  
  isSelectedDateDisabled: function() {
    return this.refs.calendar.isSelectedDateDisabled();
  },

  _addSelectedDays: function(days) {
    this._setSelectedDate(DateTime.addDays(this.state.selectedDate, days));
  },

  _addSelectedMonths: function(months) {
    this._setSelectedDate(DateTime.addMonths(this.state.selectedDate, months));
  },
  
  _addSelectedYears: function(years) {
    this._setSelectedDate(DateTime.addYears(this.state.selectedDate, years));
  },

  _setDisplayDate: function(d, newSelectedDate) {
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

  _setSelectedDate: function(d) {
    var newDisplayDate = DateTime.getFirstDayOfMonth(d);

    if (newDisplayDate !== this.state.displayDate) {
      this._setDisplayDate(newDisplayDate, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
  },

  _handleDayTouchTap: function(e, date) {
    this._setSelectedDate(date);
  },

  _handleMonthChange: function(months) {
    this._addSelectedMonths(months);
  },

  _handleYearChange: function(years) {
    this._addSelectedYears(years);
  },
  
  _handleYearTouchTap: function(e, year) {
    var date = DateTime.clone(this.state.selectedDate);
    date.setFullYear(year);
    this._setSelectedDate(date);
  },
  
  _getToolbarInteractions: function() {
    return {
      prevMonth: DateTime.monthDiff(this.state.selectedDate, this.props.startDate) > 0,
      nextMonth: DateTime.monthDiff(this.state.selectedDate, this.props.endDate) < 0,
      prevYear: DateTime.yearDiff(this.state.selectedDate, this.props.startDate) > 0,
      nextYear: DateTime.yearDiff(this.state.selectedDate, this.props.endDate) < 0
    }
  },
  
  _handleMonthDayClick: function() {
    this.setState({displayMonthDay: true});
  },
  
  _handleYearClick: function() {
    this.setState({displayMonthDay: false});
  },

  _handleWindowKeyDown: function(e) {
    if (this.props.isActive) {

      switch (e.keyCode) {
        case KeyCode.UP:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1)
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(-1);
          } else {
            this._addSelectedDays(-7);
          }
          break;

        case KeyCode.DOWN:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(7);
          }
          break;

        case KeyCode.RIGHT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(1);
          }
          else if (e.shiftKey) {
            this._addSelectedMonths(1);
          } else {
            this._addSelectedDays(1);
          }
          break;

        case KeyCode.LEFT:
          if (e.altKey && e.shiftKey) {
            this._addSelectedYears(-1);
          }
          else if (e.shiftKey) {
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