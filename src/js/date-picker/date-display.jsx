var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({

  mixins: [Classable],

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
    var {
      selectedDate,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker-date-display');
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    return (
      <div {...other} className={classes}>

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