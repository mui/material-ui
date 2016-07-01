import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

import SlideIn from '../internal/SlideIn';

const styleSheet = createStyleSheet('DateDisplay', (theme) => {
  const datePicker = theme.datePicker;

  return {
    root: {
      width: '100%',
      height: 'auto',
      fontWeight: 700,
      display: 'inline-block',
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      borderBottomLeftRadius: 0,
      color: datePicker.textColor,
      padding: 20,
      boxSizing: 'border-box',
    },
    rootLandscape: {
      width: 165,
      height: 330,
      float: 'left',
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 2,
    },
    monthDay: {
      display: 'block',
      fontSize: 36,
      lineHeight: '36px',
      width: '100%',
      fontWeight: '500',
    },
    monthDayTitle: {
      width: '100%',
      display: 'block',
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: '16px',
      marginBottom: 10,
    },
  };
});

function getStyles(props, state) {
  const {
    selectedYear,
  } = state;

  const styles = {
    monthDay: {
      opacity: selectedYear ? 0.7 : 1,
      height: props.mode === 'landscape' ? '100%' : 38,
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
    },
    year: {
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
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
    selectedYear: !this.props.monthDaySelected,
    transitionDirection: 'up',
  };

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
      prepareStyles,
      styleManager,
    } = this.context.muiTheme;
    const classes = styleManager.render(styleSheet);

    const {
      DateTimeFormat,
      disableYearSelection, // eslint-disable-line no-unused-vars
      locale,
      mode, // eslint-disable-line no-unused-vars
      monthDaySelected, // eslint-disable-line no-unused-vars
      onTouchTapMonthDay, // eslint-disable-line no-unused-vars
      onTouchTapYear, // eslint-disable-line no-unused-vars
      selectedDate, // eslint-disable-line no-unused-vars
      weekCount, // eslint-disable-line no-unused-vars
    } = this.props;

    const {
      transitionDirection,
    } = this.state;

    const styles = getStyles(this.props, this.state);
    const year = selectedDate.getFullYear();

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(selectedDate);

    const rootClassName = classNames(classes.root, {
      [classes.rootLandscape]: mode === 'landscape',
    });

    return (
      <div className={rootClassName}>
        <SlideIn
          className={classes.year}
          style={styles.year}
          direction={transitionDirection}
        >
          <div
            key={year}
            style={styles.yearTitle}
            onTouchTap={this.handleTouchTapYear}
          >
            {year}
          </div>
        </SlideIn>
        <SlideIn
          className={classes.monthDay}
          style={styles.monthDay}
          direction={transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            onTouchTap={this.handleTouchTapMonthDay}
            className={styles.monthDayTitle}
            style={prepareStyles(styles.monthDayTitle)}
          >
            {dateTimeFormatted}
          </div>
        </SlideIn>
      </div>
    );
  }
}

export default DateDisplay;
