var React = require('react');
var DateTime = require('../utils/date-time.js');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarToolbar = require('./calendar-toolbar.jsx');
var SlideInTransitionGroup = require('../transitions/slide-in.jsx');

var Calendar = React.createClass({

  propTypes: {
    onSelectedDateChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      focusDate: DateTime.getFirstDayOfMonth(this.props.selectedDate),
      transitionDirection: 'left'
    };
  },

  render: function() {
    var weekCount = DateTime.getWeekArray(this.state.focusDate).length;
    var calendarStyle = {
      height: weekCount * 40 + 8
    };

    return (
      <div className="mui-date-picker-calendar">

        <CalendarToolbar
          focusDate={this.state.focusDate}
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
            key={this.state.focusDate.toDateString()}
            focusDate={this.state.focusDate}
            onDayTouchTap={this._handleDayTouchTap}
            selectedDate={this.props.selectedDate}
            style={calendarStyle} />
        </SlideInTransitionGroup>

      </div>
    );
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onSelectedDateChange &&
      (!DateTime.isEqualDate(this.props.selectedDate, date))) {
      this.props.onSelectedDateChange(e, date);
    }
  },

  _addFocusDate: function(m) {
    var focusDate;
    var direction;

    focusDate = DateTime.clone(this.state.focusDate);
    focusDate.setMonth(focusDate.getMonth() + m);

    direction = focusDate > this.state.focusDate ? 'left' : 'right';

    this.setState({
      focusDate: focusDate,
      transitionDirection: direction
    });
  },

  _handleLeftTouchTap: function() {
    this._addFocusDate(-1);
  },

  _handleRightTouchTap: function() {
    this._addFocusDate(1);
  }

});

module.exports = Calendar;