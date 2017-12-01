import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography, withStyles } from 'material-ui';
import { DateTimePicker, DatePicker } from 'material-ui-pickers';

class CustomElements extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  handleWeekChange = (date) => {
    this.setState({ selectedDate: date.clone().startOf('week') });
  }

  formatWeekSelectLabel = (date, invalidLabel) => (date && date.isValid()
    ? `Week of ${date.clone().startOf('week').format('MMM Do')}`
    : invalidLabel)

  renderCustomDayForDateTime = (date, selectedDate, dayInCurrentMonth, dayComponent) => {
    const { classes } = this.props;

    const dayClassName = [
      (date.isSame(selectedDate, 'day')) && classes.customDayHighlight,
    ].join(' ');

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    );
  }

  renderWrappedDefaultDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;

    const startDate = selectedDate.clone().day(0).startOf('day');
    const endDate = selectedDate.clone().day(6).endOf('day');

    const dayIsBetween = (
      date.isSame(startDate) ||
      date.isSame(endDate) ||
      (date.isAfter(startDate) && date.isBefore(endDate))
    );

    const firstDay = date.isSame(startDate, 'day');
    const lastDay = date.isSame(endDate, 'day');

    const wrapperClassName = [
      dayIsBetween ? classes.highlight : null,
      firstDay ? classes.firstHighlight : null,
      lastDay ? classes.endHighlight : null,
    ].join(' ');

    const dayClassName = [
      classes.day,
      (!dayInCurrentMonth) && classes.nonCurrentMonthDay,
      (!dayInCurrentMonth && dayIsBetween) && classes.highlightNonCurrentMonthDay,
    ].join(' ');

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> { date.format('DD')} </span>
        </IconButton>
      </div>
    );
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            Week picker
          </Typography>

          <DatePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            renderDay={this.renderWrappedDefaultDay}
            labelFunc={this.formatWeekSelectLabel}
          />
        </div>

        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            DateTime picker
          </Typography>

          <DateTimePicker
            autoSubmit={false}
            value={selectedDate}
            onChange={this.handleDateChange}
            renderDay={this.renderCustomDayForDateTime}
          />
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary,
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: '2px solid #6270bf',
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: '#BCBCBC',
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: '#9fa8da',
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
});

export default withStyles(styles)(CustomElements);
