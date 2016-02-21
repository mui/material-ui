import React from 'react';
import ReactDOM from 'react-dom';
import DateTime from '../utils/dateTime';
import YearButton from './YearButton';
import getMuiTheme from '../styles/getMuiTheme';

const CalendarYear = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onYearTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
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

  handleTouchTap(event, year) {
    if (this.props.onYearTouchTap) this.props.onYearTouchTap(event, year);
  },

  render() {
    const years = this._getYears();
    const backgroundColor = this.state.muiTheme.datePicker.calendarYearBackgroundColor;
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
  },

});

export default CalendarYear;
