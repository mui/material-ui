var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var DateTime = require('../utils/date-time');
var DayButton = require('./day-button');
var ClearFix = require('../clearfix');

var CalendarMonth = React.createClass({

  //mixins: [StylePropable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func
  },

  render: function() {
    var styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: Colors.white
    };

    return (
      <div style={styles}>
        {this._getWeekElements()}
      </div>
    );
  },
  
  isSelectedDateDisabled: function() {
    return this._selectedDateDisabled;
  },

  _getWeekElements: function() {
    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function(week, i) {
      return (
        <ClearFix key={i}>
          {this._getDayElements(week)}
        </ClearFix>
      );
    }, this);
  },

  _getDayElements: function(week) {
    return week.map(function(day, i) {
      var isSameDate = DateTime.isEqualDate(this.props.selectedDate, day);
      var disabled = this._shouldDisableDate(day);
      var selected = !disabled && isSameDate;
      
      if (isSameDate) {
        if (disabled) {
          this._selectedDateDisabled = true;
        }
        else {
          this._selectedDateDisabled = false;
        }
      }
      
      return (
        <DayButton
          key={'db' + i}
          date={day}
          onTouchTap={this._handleDayTouchTap}
          selected={selected}
          disabled={disabled} />
      );
    }, this);
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },
  
  _shouldDisableDate: function(day) {
    if (day === null) return false;
    var disabled = !DateTime.isBetweenDates(day, this.props.startDate, this.props.endDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);
    
    return disabled;
  }

});

module.exports = CalendarMonth;
