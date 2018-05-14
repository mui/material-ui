import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import View from './DateTimePickerView';
import YearSelection from '../DatePicker/YearSelection';
import Calendar from '../DatePicker/Calendar';
import HourView from '../TimePicker/HourView';
import MinutesView from '../TimePicker/MinutesView';
import DateTimePickerTabs from './DateTimePickerTabs';
import DatetimePickerHeader from './DateTimePickerHeader';
import { convertToMeridiem } from '../_helpers/time-utils';

import DomainPropTypes from '../constants/prop-types';
import * as viewType from '../constants/date-picker-view';
import withUtils from '../_shared/WithUtils';

export class DateTimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.oneOf(Object.keys(viewType).map(key => viewType[key])).isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    minDate: DomainPropTypes.date.isRequired,
    maxDate: DomainPropTypes.date.isRequired,
    showTabs: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    dateRangeIcon: PropTypes.node,
    timeIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    animateYearScrolling: PropTypes.bool,
    fadeTimeout: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
  }

  static defaultProps = {
    autoSubmit: true,
    disablePast: false,
    disableFuture: false,
    showTabs: true,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    dateRangeIcon: undefined,
    timeIcon: undefined,
    renderDay: undefined,
    ampm: true,
    shouldDisableDate: undefined,
    animateYearScrolling: false,
  }

  state = {
    openView: this.props.openTo,
    meridiemMode: this.props.utils.getHours(this.props.date) >= 12 ? 'pm' : 'am',
  }

  onChange = (time, isFinish = true, nextView) => {
    this.handleChange(time);

    if (isFinish && this.props.autoSubmit) {
      this.handleViewChange(nextView);
    }
  }

  setMeridiemMode = mode => () => {
    this.setState(
      { meridiemMode: mode },
      () => this.handleChange(this.props.date, false),
    );
  }

  handleViewChange = (view) => {
    this.setState({ openView: view });
  }

  handleChange = (time, isFinish = false) => {
    const withMeridiem = convertToMeridiem(
      time,
      this.state.meridiemMode,
      this.props.ampm,
      this.props.utils,
    );
    this.props.onChange(withMeridiem, isFinish);
  }

  handleYearChange = (date, isFinish) => {
    this.onChange(date, isFinish, viewType.DATE);
  }

  handleDayChange = (date, isFinish) => {
    this.onChange(date, isFinish, viewType.HOUR);
  }

  handleHourChange = (time, isFinish) => {
    this.onChange(time, isFinish, viewType.MINUTES);
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      showTabs,
      disablePast,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
      utils,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      fadeTimeout,
      classes,
    } = this.props;

    return (
      <Fragment>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
          utils={utils}
          ampm={ampm}
        />

        {
          showTabs &&
            <DateTimePickerTabs
              view={openView}
              onChange={this.handleViewChange}
              dateRangeIcon={dateRangeIcon}
              timeIcon={timeIcon}
            />
        }

        <div className={classes.viewContainer}>
          <View view={viewType.YEAR} selected={openView}>
            <YearSelection
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleYearChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              utils={utils}
              animateYearScrolling={animateYearScrolling}
            />
          </View>

          <View view={viewType.DATE} selected={openView}>
            <Calendar
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={this.handleDayChange}
              disablePast={disablePast}
              disableFuture={disableFuture}
              leftArrowIcon={leftArrowIcon}
              rightArrowIcon={rightArrowIcon}
              renderDay={renderDay}
              utils={utils}
              shouldDisableDate={shouldDisableDate}
            />
          </View>

          <View
            timeout={fadeTimeout}
            view={viewType.HOUR}
            selected={openView}
          >
            <HourView
              date={date}
              meridiemMode={meridiemMode}
              onChange={this.handleHourChange}
              utils={utils}
              ampm={ampm}
            />
          </View>

          <View
            timeout={fadeTimeout}
            view={viewType.MINUTES}
            selected={openView}
          >
            <MinutesView
              date={date}
              onChange={this.handleChange}
              utils={utils}
            />
          </View>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  viewContainer: {
    minHeight: 300,
    position: 'relative',
  },
};

export default withStyles(styles)(withUtils()(DateTimePicker));
