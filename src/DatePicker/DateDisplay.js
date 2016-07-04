import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import SlideInTransitionGroup from '../internal/SlideIn';

function getStyles(props, context, state) {
  const {datePicker} = context.muiTheme;
  const {selectedYear} = state;
  const isLandscape = props.mode === 'landscape';

  const styles = {
    root: {
      width: isLandscape ? 165 : '100%',
      height: isLandscape ? 330 : 'auto',
      float: isLandscape ? 'left' : 'none',
      fontWeight: 700,
      display: 'inline-block',
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: isLandscape ? 0 : 2,
      borderBottomLeftRadius: isLandscape ? 2 : 0,
      color: datePicker.textColor,
      padding: 20,
      boxSizing: 'border-box',
    },
    monthDay: {
      display: 'block',
      fontSize: 36,
      lineHeight: '36px',
      height: props.mode === 'landscape' ? '100%' : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: transitions.easeOut(),
      width: '100%',
      fontWeight: '500',
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
      width: '100%',
      display: 'block',
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: transitions.easeOut(),
      marginBottom: 10,
    },
    yearTitle: {
      cursor: props.disableYearSelection ? 'not-allowed' : (!selectedYear ? 'pointer' : 'default'),
    },
  };

  return styles;
}

class DateDisplay extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    disableYearSelection: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: PropTypes.bool,
    onTouchTapMonthDay: PropTypes.func,
    onTouchTapYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    style: PropTypes.object,
    weekCount: PropTypes.number,
  };

  static defaultProps = {
    disableYearSelection: false,
    monthDaySelected: true,
    weekCount: 4,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    selectedYear: false,
    transitionDirection: 'up',
  };

  componentWillMount() {
    if (!this.props.monthDaySelected) {
      this.setState({selectedYear: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({
        selectedYear: !nextProps.monthDaySelected,
      });
    }
  }

  handleTouchTapMonthDay = () => {
    if (this.props.onTouchTapMonthDay && this.state.selectedYear) {
      this.props.onTouchTapMonthDay();
    }

    this.setState({selectedYear: false});
  };

  handleTouchTapYear = () => {
    if (this.props.onTouchTapYear && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.onTouchTapYear();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  };

  render() {
    const {
      DateTimeFormat,
      disableYearSelection, // eslint-disable-line no-unused-vars
      locale,
      mode, // eslint-disable-line no-unused-vars
      monthDaySelected, // eslint-disable-line no-unused-vars
      onTouchTapMonthDay, // eslint-disable-line no-unused-vars
      onTouchTapYear, // eslint-disable-line no-unused-vars
      selectedDate, // eslint-disable-line no-unused-vars
      style,
      weekCount, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const year = selectedDate.getFullYear();

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(selectedDate);

    return (
      <div {...other} style={prepareStyles(styles.root, style)}>
        <SlideInTransitionGroup
          style={styles.year}
          direction={this.state.transitionDirection}
        >
          <div key={year} style={styles.yearTitle} onTouchTap={this.handleTouchTapYear}>
            {year}
          </div>
        </SlideInTransitionGroup>
        <SlideInTransitionGroup
          style={styles.monthDay}
          direction={this.state.transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            onTouchTap={this.handleTouchTapMonthDay}
            style={styles.monthDayTitle}
          >
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
      </div>
    );
  }
}

export default DateDisplay;
