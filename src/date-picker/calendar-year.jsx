import React from 'react';
import ReactDOM from 'react-dom';
import Colors from '../styles/colors';
import DateTime from '../utils/date-time';
import YearButton from './year-button';

const CalendarYear = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
  },

  componentDidMount() {
    this._scrollToSelectedYear();
  },

  componentDidUpdate() {
    this._scrollToSelectedYear();
  },

  _getYears() {
    const minYear = this.props.minDate.getFullYear();
    const maxYear = this.props.maxDate.getFullYear();

    const years = [];
    const dateCheck = DateTime.clone(this.props.selectedDate);
    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      if (!DateTime.isBetweenDates(dateCheck, this.props.minDate, this.props.maxDate)) continue;
      const selected = this.props.selectedDate.getFullYear() === year;
      let selectedProps = {};
      if (selected) {
        selectedProps = {ref: 'selectedYearButton'};
      }

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          year={year}
          onTouchTap={this._handleYearTouchTap}
          selected={selected}
          {...selectedProps}
        />
      );

      years.push(yearButton);
    }

    return years;
  },

  _scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) return;

    const container = ReactDOM.findDOMNode(this);
    const yearButtonNode = ReactDOM.findDOMNode(this.refs.selectedYearButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  },

  _handleYearTouchTap(e, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(e, year);
  },

  render() {
    const years = this._getYears();
    const styles = {
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

});

export default CalendarYear;
