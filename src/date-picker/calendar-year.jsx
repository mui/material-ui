let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Colors = require('../styles/colors');
let DateTime = require('../utils/date-time');
let YearButton = require('./year-button');


let CalendarYear = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
  },

  componentDidMount() {
    this._scrollToSelectedYear();
  },

  componentDidUpdate() {
    this._scrollToSelectedYear();
  },

  render() {
    let years = this._getYears();
    let styles = {
      position: 'relative',
      height: 'inherit',
      lineHeight: '36px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: Colors.white,
      overflowX: 'hidden',
      overflowY: 'scroll',
    };

    return (
      <div style={styles}>
        {years}
      </div>
    );
  },

  _getYears() {
    let minYear = this.props.minDate.getFullYear();
    let maxYear = this.props.maxDate.getFullYear();

    let years = [];
    let dateCheck = DateTime.clone(this.props.selectedDate);
    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      if (!DateTime.isBetweenDates(dateCheck, this.props.minDate, this.props.maxDate)) continue;
      let selected = this.props.selectedDate.getFullYear() === year;
      let selectedProps = {};
      if (selected) {
        selectedProps = {ref: 'selectedYearButton'};
      }

      let yearButton = (
        <YearButton
          key={'yb' + year}
          year={year}
          onTouchTap={this._handleYearTouchTap}
          selected={selected}
          {...selectedProps} />
      );

      years.push(yearButton);
    }

    return years;
  },

  _scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) return;

    let container = this.getDOMNode();
    let yearButtonNode = this.refs.selectedYearButton.getDOMNode();

    let containerHeight = container.clientHeight;
    let yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    let scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  },

});

module.exports = CalendarYear;
