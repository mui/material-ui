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
import { convertToMeridiem } from '../TimePicker/utils/time-utils';

import DomainPropTypes from '../constants/prop-types';
import * as viewType from '../constants/date-picker-view';

export class DateTimePicker extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    autoSubmit: PropTypes.bool,
    openTo: PropTypes.oneOf(Object.values(viewType)),
    disableFuture: PropTypes.bool,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    showTabs: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    dateRangeIcon: PropTypes.node,
    timeIcon: PropTypes.node,
    renderDay: PropTypes.func,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    autoSubmit: true,
    openTo: viewType.DATE,
    disableFuture: false,
    showTabs: true,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    dateRangeIcon: undefined,
    timeIcon: undefined,
    renderDay: undefined,
  }

  state = {
    openView: this.props.openTo,
    meridiemMode: this.props.date.format('a'),
  }

  onChange = nextView => (time, isFinish = true) => {
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
    const withMeridiem = convertToMeridiem(time, this.state.meridiemMode);
    this.props.onChange(withMeridiem, isFinish);
  }

  render() {
    const { openView, meridiemMode } = this.state;
    const {
      date,
      minDate,
      maxDate,
      showTabs,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
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
            onChange={this.onChange(viewType.DATE)}
            disableFuture={disableFuture}
          />
        </View>

        <View view={viewType.DATE} selected={openView}>
          <Calendar
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={this.onChange(viewType.HOUR)}
            disableFuture={disableFuture}
            leftArrowIcon={leftArrowIcon}
            rightArrowIcon={rightArrowIcon}
            renderDay={renderDay}
          />
        </View>

        <View view={viewType.HOUR} selected={openView}>
          <HourView
            date={date}
            meridiemMode={meridiemMode}
            onChange={this.onChange(viewType.MINUTES)}
          />
        </View>

        <View view={viewType.MINUTES} selected={openView}>
          <MinutesView
            date={date}
            onChange={this.handleChange}
          />
        </View>
      </div>
    );
  }
}

const styles = () => ({

});

export default withStyles(styles)(DateTimePicker);
