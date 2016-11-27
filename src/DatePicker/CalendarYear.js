import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import YearButton from './YearButton';
import {cloneDate} from './dateUtils';

class CalendarYear extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object.isRequired,
    minDate: PropTypes.object.isRequired,
    onTouchTapYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    wordings: PropTypes.object,
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
    const {
      DateTimeFormat,
      locale,
      minDate,
      maxDate,
      selectedDate,
    } = this.props;

    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const years = [];
    const dateCheck = cloneDate(selectedDate);

    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      const selected = selectedDate.getFullYear() === year;
      const selectedProps = {};
      if (selected) {
        selectedProps.ref = 'selectedYearButton';
      }

      const yearFormated = new DateTimeFormat(locale, {
        year: 'numeric',
      }).format(dateCheck);

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          onTouchTap={this.handleTouchTapYear}
          selected={selected}
          year={year}
          {...selectedProps}
        >
          {yearFormated}
        </YearButton>
      );

      years.push(yearButton);
    }

    return years;
  }

  scrollToSelectedYear() {
    if (this.refs.selectedYearButton === undefined) {
      return;
    }

    const container = ReactDOM.findDOMNode(this);
    const yearButtonNode = ReactDOM.findDOMNode(this.refs.selectedYearButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  }

  handleTouchTapYear = (event, year) => {
    if (this.props.onTouchTapYear) {
      this.props.onTouchTapYear(event, year);
    }
  };

  render() {
    const {
      prepareStyles,
      datePicker: {
        calendarYearBackgroundColor,
      },
    } = this.context.muiTheme;

    const styles = {
      root: {
        backgroundColor: calendarYearBackgroundColor,
        height: 'inherit',
        lineHeight: '35px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        position: 'relative',
      },
      child: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.child)}>
          {this.getYears()}
        </div>
      </div>
    );
  }
}

export default CalendarYear;
