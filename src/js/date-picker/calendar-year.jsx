var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var YearButton = require('./year-button');

var CalendarYear = React.createClass({

  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    startDate: React.PropTypes.object,
    endDate: React.PropTypes.object
  },
  
  componentDidMount: function() {
    this._scrollToSelectedYear();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    this._scrollToSelectedYear();
  },

  render: function() {
    var classes = this.getClasses('mui-date-picker-calendar-year');

    return (
      <div className={classes}>
      {this._getYears()}
      </div>
    );
  },

  _getYears: function() {
    var startYear = this.props.startDate.getFullYear();
    var endYear = this.props.endDate.getFullYear();
    
    var years = [];
    var dateCheck = DateTime.clone(this.props.selectedDate);
    for (var year = startYear; year <= endYear; year++) {
      dateCheck.setFullYear(year);
      if (!DateTime.isBetweenDates(dateCheck, this.props.startDate, this.props.endDate)) continue;
      var selected = this.props.selectedDate.getFullYear() === year;
      var selectedProps = {};
      if (selected) {
        selectedProps = {ref: 'selectedYearButton'}
      }
      
      var yearButton = (
        <YearButton
          key={'year-button-' + year}
          year={year}
          onTouchTap={this._handleYearTouchTap}
          selected={selected}
          {...selectedProps} />
      )
      
      years.push(yearButton);
    }
    
    return years;
  },
  
  _scrollToSelectedYear: function() {
    var container = this.getDOMNode();
    var ybNode = this.refs.selectedYearButton.getDOMNode();
    
    // Currently do not have DOM utils to get the height of an element when height is 
    // specified in a CSS class across all browsers.
    var containerHeight = 268;
    var ybNodeHeight = 32;
    
    var scrollYOffset = (ybNode.offsetTop + ybNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap: function(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  }

});

module.exports = CalendarYear;