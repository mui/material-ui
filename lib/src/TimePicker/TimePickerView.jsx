import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import * as clockType from '../constants/clock-types';
import withUtils from '../_shared/WithUtils';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';

export class TimePickerView extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onHourChange: PropTypes.func.isRequired,
    onMinutesChange: PropTypes.func.isRequired,
    onSecondsChange: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
    type: PropTypes.oneOf(Object.keys(clockType).map(key => clockType[key])).isRequired,
  }

  static defaultProps = {
    ampm: true,
  }

  getViewProps = () => {
    const {
      type, ampm, date, utils,
    } = this.props;

    switch (type) {
      case clockType.HOURS:
        return {
          value: utils.getHours(date),
          children: getHourNumbers({ date, ampm, utils }),
          onChange: this.handleHourChange,
        };

      case clockType.MINUTES:
        const minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({ value: minutesValue, utils }),
          onChange: this.handleMinutesChange,
        };

      case clockType.SECONDS:
        const secondsValue = utils.getSeconds(date);
        return {
          value: secondsValue,
          children: getMinutesNumbers({ value: secondsValue, utils }),
          onChange: this.handleChange,
        };

      default:
        throw new Error('You must provide the type for TimePickerView');
    }
  }

  handleHourChange = (hours, isFinish) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setHours(date, hours);

    this.props.onHourChange(updatedTime, isFinish);
  };

  handleMinutesChange = (minutes, isFinish) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setMinutes(date, minutes);

    this.props.onMinutesChange(updatedTime, isFinish);
  };

  handleSecondsChange = (seconds, isFinish) => {
    const { date, utils } = this.props;
    const updatedTime = utils.setSeconds(date, seconds);

    this.props.onSecondsChange(updatedTime, isFinish);
  };

  render() {
    const { ampm, type } = this.props;
    const viewProps = this.getViewProps();

    return (
      <Clock
        type={type}
        ampm={ampm}
        {...viewProps}
      />
    );
  }
}

export default withUtils()(TimePickerView);

