var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Colors = require('../styles/colors');
var DateTime = require('../utils/date-time');
var YearButton = require('./year-button');

var CalendarYear = React.createClass({

  mixins: [StylePropable],

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
    var years = this._getYears();
    var styles = {
      position: 'relative',
      height: 'inherit',
      lineHeight: '36px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: Colors.white,
      overflowX: 'hidden',
      overflowY: 'scroll'
    };

    return (
      <div style={styles}>
        {years}
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
    if (this.refs.selectedYearButton === undefined) return;
    
    var container = this.getDOMNode();
    var yearButtonNode = this.refs.selectedYearButton.getDOMNode();

    var containerHeight = container.clientHeight;
    var yearButtonNodeHeight = yearButtonNode.clientHeight || 32;
    
    var scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap: function(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  }

});

module.exports = CalendarYear;
