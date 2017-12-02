import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import YearButton from './YearButton';

class CalendarYear extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object.isRequired,
    minDate: PropTypes.object.isRequired,
    onClickYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    utils: PropTypes.object.isRequired,
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
      utils,
    } = this.props;

    const minYear = utils.getYear(minDate);
    const maxYear = utils.getYear(maxDate);
    const years = [];

    for (let year = minYear; year <= maxYear; year++) {
      const selected = utils.getYear(selectedDate) === year;
      const selectedProps = {};
      if (selected) {
        selectedProps.ref = 'selectedYearButton';
      }

      const yearFormated = new DateTimeFormat(locale, {
        year: 'numeric',
      }).format(utils.setYear(selectedDate, year));

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          onClick={this.handleClickYear}
          selected={selected}
          year={year}
          utils={utils}
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

  handleClickYear = (event, year) => {
    if (this.props.onClickYear) {
      this.props.onClickYear(event, year);
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
