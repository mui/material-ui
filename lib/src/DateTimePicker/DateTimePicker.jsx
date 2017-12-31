import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import View from './DateTimePickerView';
import YearSelection from '../DatePicker/YearSelection';
import Calendar from '../DatePicker/Calendar';
import HourView from '../TimePicker/HourView';
import MinutesView from '../TimePicker/MinutesView';
import DateTimePickerTabs from './DateTimePickerTabs';
import DatetimePickerHeader from './DateTimePickerHeader';
import { convertToMeridiem } from '../utils/time-utils';

import DomainPropTypes from '../constants/prop-types';
import * as viewType from '../constants/date-picker-view';
import * as defaultUtils from '../utils/utils';

export class DateTimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.oneOf(Object.keys(viewType).map(key => viewType[key])),
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    showTabs: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    dateRangeIcon: PropTypes.node,
    timeIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object,
    ampm: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    animateYearScrolling: PropTypes.bool,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    autoSubmit: true,
    openTo: viewType.DATE,
    disablePast: false,
    disableFuture: false,
    showTabs: true,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    dateRangeIcon: undefined,
    timeIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
    ampm: true,
    shouldDisableDate: undefined,
    animateYearScrolling: false,
  }

  state = {
    openView: this.props.openTo,
    meridiemMode: this.props.date.hours() >= 12 ? 'pm' : 'am',
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
    const withMeridiem = convertToMeridiem(time, this.state.meridiemMode, this.props.ampm);
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

        <View view={viewType.HOUR} selected={openView}>
          <HourView
            date={date}
            meridiemMode={meridiemMode}
            onChange={this.handleHourChange}
            utils={utils}
            ampm={ampm}
          />
        </View>

        <View view={viewType.MINUTES} selected={openView}>
          <MinutesView
            date={date}
            onChange={this.handleChange}
            utils={utils}
          />
        </View>
      </Fragment>
    );
  }
}

export default DateTimePicker;
