var React = require('react');
var DateTime = require('../utils/date-time.js');
var SlideInTransitionGroup = require('../transitions/slide-in.jsx');

var DateDisplay = React.createClass({

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },

  render: function() {
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    return (
      <div className="mui-date-picker-date-display">

        <SlideInTransitionGroup
          className="mui-date-picker-date-display-dow"
          direction={this.state.transitionDirection}>
          <div key={dayOfWeek}>{dayOfWeek}</div>
        </SlideInTransitionGroup>

        <div className="mui-date-picker-date-display-date">

          <SlideInTransitionGroup
            className="mui-date-picker-date-display-month"
            direction={this.state.transitionDirection}>
            <div key={month}>{month}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className="mui-date-picker-date-display-day"
            direction={this.state.transitionDirection}>
            <div key={day}>{day}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className="mui-date-picker-date-display-year"
            direction={this.state.transitionDirection}>
            <div key={year}>{year}</div>
          </SlideInTransitionGroup>

        </div>

      </div>
    );
  }

});

module.exports = DateDisplay;