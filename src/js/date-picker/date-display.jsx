var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var DateDisplay = React.createClass({

  mixins: [Classable],

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired,
    yearSelectionAvailable: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      yearSelectionAvailable: true
    };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up',
      selectedYear: false
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
    var dayClass = this._getDayClassName();
    var monthClass = this._getMonthClassName();
    var yearClass = this._getYearClassName();

    return (
      <div {...other} className={classes}>

        <SlideInTransitionGroup
          className="mui-date-picker-date-display-dow"
          direction={this.state.transitionDirection}>
          <div key={dayOfWeek}>{dayOfWeek}</div>
        </SlideInTransitionGroup>

        <div className="mui-date-picker-date-display-date">

          <SlideInTransitionGroup
            className={monthClass}
            direction={this.state.transitionDirection}>
            <div key={month} onClick={this._handleMonthDayClick}>{month}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className={dayClass}
            direction={this.state.transitionDirection}>
            <div key={day} onClick={this._handleMonthDayClick}>{day}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className={yearClass}
            direction={this.state.transitionDirection}>
            <div key={year} onClick={this._handleYearClick}>{year}</div>
          </SlideInTransitionGroup>

        </div>

      </div>
    );
  },
  
  _getYearClassName: function() {
    var className = "mui-date-picker-date-display-year";
    
    if (!this.props.yearSelectionAvailable) className += " unavailable";
    if (this.state.selectedYear) className += " selected";
    
    return className;
  },
  
  _getMonthClassName: function() {
    var className = "mui-date-picker-date-display-month";
    
    if (!this.state.selectedYear) className += " selected";
    
    return className;
  },
  
  _getDayClassName: function() {
    var className = "mui-date-picker-date-display-day";
    
    if (!this.state.selectedYear) className += " selected";
    
    return className;
  },
  
  _handleMonthDayClick: function() {
    if (this.props.handleMonthDayClick && this.state.selectedYear) {
      this.props.handleMonthDayClick();
      this.setState({selectedYear: false});
    }
  },
  
  _handleYearClick: function() {
    if (this.props.handleYearClick && !this.state.selectedYear && this.props.yearSelectionAvailable) {
      this.props.handleYearClick();
      this.setState({selectedYear: true});
    }
  }

});

module.exports = DateDisplay;