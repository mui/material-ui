import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui';

import View from './DateTimePickerView';
import YearSelection from '../DatePicker/YearSelection';
import Calendar from '../DatePicker/Calendar';
import HourView from '../TimePicker/HourView';
import MinutesView from '../TimePicker/MinutesView';
import DateTimePickerTabs from './DateTimePickerTabs';
import DatetimePickerHeader from './DateTimePickerHeader';

import * as viewType from '../constants/date-picker-view';

class DateTimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.string,
    disableFuture: PropTypes.bool,
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    autoSubmit: true,
    openTo: viewType.DATE,
    disableFuture: false,
  }

  state = {
    openView: this.props.openTo,
    meridiemMode: this.props.date.format('a'),
  }

  onYearChange = (time) => {
    this.handleChange(time);
    if (this.props.autoSubmit) {
      this.handleViewChange(viewType.DATE)();
    }
  }

  onDateChange = (time) => {
    this.handleChange(time);
    if (this.props.autoSubmit) {
      this.handleViewChange(viewType.HOUR)();
    }
  }

  onHourChange = (time, isFinish) => {
    this.handleChange(time);
    if (isFinish && this.props.autoSubmit) {
      this.handleViewChange(viewType.MINUTES)();
    }
  }

  onMinutesChange = (time, isFinish) => {
    this.handleChange(time, isFinish);
  }

  setMeridiemMode = mode => () => {
    this.setState({ meridiemMode: mode });
  }

  handleViewChange = view => () => {
    this.setState({ openView: view });
  }

  handleChange = (time) => {
    this.props.onChange(time);
  }

  handleTabChange = (openView) => {
    this.setState({ openView });
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      disableFuture,
    } = this.props;

    return (
      <div>
        <DatetimePickerHeader
          date={date}
          openView={openView}
          meridiemMode={meridiemMode}
          setMeridiemMode={this.setMeridiemMode}
          onOpenViewChange={this.handleViewChange}
        />

        <DateTimePickerTabs
          view={openView}
          onChange={this.handleTabChange}
        />

        <View view={viewType.YEAR} selected={openView}>
          <YearSelection
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.onYearChange}
            disableFuture={disableFuture}
          />
        </View>

        <View view={viewType.DATE} selected={openView}>
          <Calendar
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.onDateChange}
            disableFuture={disableFuture}
          />
        </View>

        <View view={viewType.HOUR} selected={openView}>
          <HourView
            date={date}
            meridiemMode={meridiemMode}
            onChange={this.onHourChange}
          />
        </View>

        <View view={viewType.MINUTES} selected={openView}>
          <MinutesView
            date={date}
            onChange={this.onMinutesChange}
          />
        </View>
      </div>
    );
  }
}

const styles = () => ({

});

export default withStyles(styles)(DateTimePicker);
