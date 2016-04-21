import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import YearButton from './YearButton';
import {cloneDate} from './dateUtils';

class CalendarYear extends Component {
  static propTypes = {
    displayDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onYearTouchTap: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate() {
    this.scrollToSelectedYear();
  }

  getYears() {
    const minYear = this.props.minDate.getFullYear();
    const maxYear = this.props.maxDate.getFullYear();

    const years = [];
    const dateCheck = cloneDate(this.props.selectedDate);
    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      const selected = this.props.selectedDate.getFullYear() === year;
      let selectedProps = {};
      if (selected) {
        selectedProps = {ref: 'selectedYearButton'};
      }

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          year={year}
          onTouchTap={this.handleTouchTap}
          selected={selected}
          {...selectedProps}
        />
      );

      years.push(yearButton);
    }

    return years;
  }

  scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) return;

    const container = ReactDOM.findDOMNode(this);
    const yearButtonNode = ReactDOM.findDOMNode(this.refs.selectedYearButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  }

  handleTouchTap = (event, year) => {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(event, year);
  };

  render() {
    const years = this.getYears();
    const backgroundColor = this.context.muiTheme.datePicker.calendarYearBackgroundColor;
    const styles = {
      position: 'relative',
      height: 'inherit',
      lineHeight: '36px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
      backgroundColor: backgroundColor,
      overflowX: 'hidden',
      overflowY: 'scroll',
    };

    return (
      <div style={styles}>
        {years}
      </div>
    );
  }
}

export default CalendarYear;
