import React from 'react';
import Transitions from '../styles/transitions';
import SlideInTransitionGroup from '../transition-groups/slide-in';

function getStyles(props, state) {
  const {
    datePicker,
  } = props.muiTheme;

  const {
    selectedYear,
  } = state;

  const styles = {
    root: {
      backgroundColor: datePicker.selectColor,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      color: datePicker.textColor,
      height: 60,
      padding: 20,
    },
    monthDay: {
      display: 'inline-block',
      fontSize: 36,
      fontWeight: '400',
      lineHeight: '36px',
      height: props.mode === 'landscape' ? 76 : 38,
      opacity: selectedYear ? 0.7 : 1,
      transition: Transitions.easeOut(),
      width: '100%',
    },
    monthDayTitle: {
      cursor: !selectedYear ? 'default' : 'pointer',
    },
    year: {
      margin: 0,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: '16px',
      height: 16,
      opacity: selectedYear ? 1 : 0.7,
      transition: Transitions.easeOut(),
      marginBottom: 10,
    },
    yearTitle: {
      cursor: (!selectedYear && !props.disableYearSelection) ? 'pointer' : 'default',
    },
  };

  return styles;
}

const DateDisplay = React.createClass({

  propTypes: {
    DateTimeFormat: React.PropTypes.func.isRequired,
    disableYearSelection: React.PropTypes.bool,
    handleMonthDayClick: React.PropTypes.func,
    handleYearClick: React.PropTypes.func,
    locale: React.PropTypes.string.isRequired,
    mode: React.PropTypes.oneOf([
      'portrait',
      'landscape',
    ]),
    monthDaySelected: React.PropTypes.bool,

    /**
     * @ignore
     * The material-ui theme applied to this component.
     */
    muiTheme: React.PropTypes.object.isRequired,

    selectedDate: React.PropTypes.object.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    weekCount: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      disableYearSelection: false,
      monthDaySelected: true,
      weekCount: 4,
    };
  },

  getInitialState() {
    return {
      selectedYear: !this.props.monthDaySelected,
      transitionDirection: 'up',
    };
  },

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
  },

  _handleMonthDayClick() {
    if (this.props.handleMonthDayClick && this.state.selectedYear) {
      this.props.handleMonthDayClick();
    }

    this.setState({selectedYear: false});
  },

  _handleYearClick() {
    if (this.props.handleYearClick && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.handleYearClick();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  },

  render() {
    const {
      DateTimeFormat,
      locale,
      selectedDate,
      style,
      muiTheme: {
        prepareStyles,
      },
      ...other,
    } = this.props;

    const year = selectedDate.getFullYear();
    const styles = getStyles(this.props, this.state);

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'short',
      weekday: 'short',
      day: '2-digit',
    }).format(selectedDate);

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        <SlideInTransitionGroup
          style={styles.year}
          direction={this.state.transitionDirection}
        >
          <div key={year} style={styles.yearTitle} onTouchTap={this._handleYearClick}>
            {year}
          </div>
        </SlideInTransitionGroup>
        <SlideInTransitionGroup
          style={styles.monthDay}
          direction={this.state.transitionDirection}
        >
          <div
            key={dateTimeFormatted}
            style={styles.monthDayTitle}
            onTouchTap={this._handleMonthDayClick}
          >
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
      </div>
    );
  },

});

export default DateDisplay;
