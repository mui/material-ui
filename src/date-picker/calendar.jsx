var React = require('react');
var StylePropable = require('../mixins/style-propable');
var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var Transitions = require('../styles/mixins/transitions');
var CustomVariables = require('../styles/variables/custom-variables.js');
var CalendarMonth = require('./calendar-month');
var CalendarYear = require('./calendar-year');
var CalendarToolbar = require('./calendar-toolbar');
var DateDisplay = require('./date-display');
var SlideInTransitionGroup = require('../transition-groups/slide-in');
var ClearFix = require('../clearfix');

var Calendar = React.createClass({

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    hideToolbarYearChange: React.PropTypes.bool,
    shouldShowMonthDayPickerFirst: React.PropTypes.bool,
    shouldShowYearPickerFirst: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date(),
      startDate: DateTime.addYears(new Date(), -100),
      endDate: DateTime.addYears(new Date(), 100),
      hideToolbarYearChange: false,
      shouldShowMonthDayPickerFirst: true,
      shouldShowYearPickerFirst: false
    };
  },

  getInitialState: function() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left',
      displayMonthDay: this.props.shouldShowMonthDayPickerFirst || this.props.shouldShowYearPickerFirst || true,
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
    
    if (nextProps.shouldShowMonthDayPickerFirst) {
      this.setState({displayMonthDay: nextProps.shouldShowMonthDayPickerFirst});
    }
  },

  render: function() {
    var yearCount = DateTime.yearDiff(this.props.endDate, this.props.startDate) + 1;
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var toolbarInteractions = this._getToolbarInteractions();
    var isMultiYearRange = yearCount > 2; // Want a year range greater than 1. Ex. [2014,2016] has a count of 3
    var isLandscape = this.props.mode === 'landscape';
    var styles = {
      root: {
        fontSize: '12px'
      },

      calendarContainer: {
        width: isLandscape ? '280px' : '100%',
        height: weekCount === 5 ? '268px' :
          weekCount === 6 ? '308px' : '228px',
        float: isLandscape ? 'right' : 'none',
        transition: Transitions.easeOut('150ms', 'height')
      },
      
      yearContainer: {
        width: '280px',
        overflow: 'hidden',
        height: yearCount < 6 ? yearCount * 56 + 10 :
          weekCount === 5 ? '268px' :
          weekCount === 6 ? '308px' : '228px',
        float: isLandscape ? 'right' : 'none'
      },

      dateDisplay: {
        width: isLandscape ? '280px' : '100%',
        height: '100%',
        float: isLandscape ? 'left' : 'none'
      },

      weekTitle: {
        padding: '0 14px',
        lineHeight: '12px',
        opacity: '0.5',
        height: '12px',
        fontWeight: '500',
        margin: 0
      },

      weekTitleDay: {
        listStyle: 'none',
        float: 'left',
        width: '32px',
        textAlign: 'center',
        margin: '0 2px'
      }
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
          style={styles.dateDisplay}
          selectedDate={this.state.selectedDate}
          handleMonthDayClick={this._handleMonthDayClick}
          handleYearClick={this._handleYearClick}
          yearSelectionAvailable={isMultiYearRange}
          monthDaySelected={this.state.displayMonthDay}
          mode={this.props.mode}
          weekCount={weekCount} />

        <div style={styles.calendarContainer}>
          <CalendarToolbar
            displayDate={this.state.displayDate}
            onMonthChange={this._handleMonthChange}
            onYearChange={this._handleYearChange}
            disabledPrevMonth={!toolbarInteractions.prevMonth}
            disabledNextMonth={!toolbarInteractions.nextMonth}
            disabledPrevYear={!toolbarInteractions.prevYear}
            disabledNextYear={!toolbarInteractions.nextYear}
            hideYearChangeButtons={this.props.hideToolbarYearChange} />

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
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              shouldDisableDate={this.props.shouldDisableDate} />
          </SlideInTransitionGroup>
        </div>
        
        <div style={styles.yearContainer}>
          <CalendarYear
            key={'years'}
            displayDate={this.state.displayDate}
            onYearTouchTap={this._handleYearTouchTap}
            selectedDate={this.state.selectedDate}
            startDate={this.props.startDate}
            endDate={this.props.endDate} />
        </div>
      </ClearFix>
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
    var adjustedDate = d;
    if (DateTime.isBeforeDate(d, this.props.startDate)) {
      adjustedDate = this.props.startDate;
    }
    else if (DateTime.isAfterDate(d, this.props.endDate)) {
      adjustedDate = this.props.endDate;
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