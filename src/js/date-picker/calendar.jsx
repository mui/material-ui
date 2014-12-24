var React = require('react');
var WindowListenable = require('../mixins/window-listenable.js');
var DateTime = require('../utils/date-time.js');
var KeyCode = require('../utils/key-code.js');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarToolbar = require('./calendar-toolbar.jsx');
var DateDisplay = require('./date-display.jsx');
var SlideInTransitionGroup = require('../transitions/slide-in.jsx');

var Calendar = React.createClass({

  mixins: [WindowListenable],

  propTypes: {
    initialDate: React.PropTypes.object,
    isActive: React.PropTypes.bool
  },

  windowListeners: {
    'keydown': '_handleWindowKeyDown'
  },

  getDefaultProps: function() {
    return {
      initialDate: new Date()
    };
  },

  getInitialState: function() {
    return {
      displayDate: DateTime.getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      transitionDirection: 'left'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      this.setState({
        selectedDate: nextProps.initialDate || new Date()
      });
    }
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.displayDate).length;
    var calendarStyle = {
      height: weekCount * 40 + 8
    };

    return (
      <div className="mui-date-picker-calendar">

        <DateDisplay selectedDate={this.state.selectedDate} />

        <CalendarToolbar
          displayDate={this.state.displayDate}
          onLeftTouchTap={this._handleLeftTouchTap}
          onRightTouchTap={this._handleRightTouchTap} />

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
          className="mui-date-picker-calendar-container"
          direction={this.state.transitionDirection}
          style={calendarStyle}>
          <CalendarMonth
            key={this.state.displayDate.toDateString()}
            displayDate={this.state.displayDate}
            onDayTouchTap={this._handleDayTouchTap}
            selectedDate={this.state.selectedDate}
            style={calendarStyle} />
        </SlideInTransitionGroup>

      </div>
    );
  },

  getSelectedDate: function() {
    return this.state.selectedDate;
  },

  _handleDayTouchTap: function(e, date) {
    this._setSelectedDate(date);
  },

  _addDisplayDate: function(m, newSelectedDate) {
    var displayDate;
    var direction;

    displayDate = DateTime.clone(this.state.displayDate);
    displayDate.setMonth(displayDate.getMonth() + m);

    direction = displayDate > this.state.displayDate ? 'left' : 'right';

    this.setState({
      displayDate: displayDate,
      transitionDirection: direction,
      selectedDate: newSelectedDate || this.state.selectedDate
    });
  },

  _addSelectedDate: function(days) {
    var d = DateTime.clone(this.state.selectedDate);
    d.setDate(d.getDate() + days);
    this._setSelectedDate(d);
  },

  _setSelectedDate: function(d) {
    var d1 = DateTime.getFirstDayOfMonth(d);
    var d2 = DateTime.getFirstDayOfMonth(this.state.selectedDate);
    var monthDiff = DateTime.monthDiff(d1, d2);

    if (monthDiff !== 0) {
      this._addDisplayDate(monthDiff, d);
    } else {
      this.setState({
        selectedDate: d
      });
    }
  },

  _handleLeftTouchTap: function() {
    this._addDisplayDate(-1);
  },

  _handleRightTouchTap: function() {
    this._addDisplayDate(1);
  },

  _handleWindowKeyDown: function(e) {
    if (this.props.isActive) {

      switch (e.keyCode) {

        case KeyCode.UP:
          this._addSelectedDate(-7);
          break;

        case KeyCode.DOWN:
          this._addSelectedDate(7);
          break;

        case KeyCode.RIGHT:
          this._addSelectedDate(1);
          break;

        case KeyCode.LEFT:
          this._addSelectedDate(-1);
          break;

      }

    } 
  }

});

module.exports = Calendar;