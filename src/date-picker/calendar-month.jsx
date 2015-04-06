var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var DateTime = require('../utils/date-time');
var DayButton = require('./day-button');
var ClearFix = require('../clearfix');

var CalendarMonth = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
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
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      return (
        <DayButton
          key={i}
          date={day}
          onTouchTap={this._handleDayTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;