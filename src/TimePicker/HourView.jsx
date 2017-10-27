import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';
import ClockNumber from './ClockNumber';
import { convertToMeridiem } from './utils/time-utils';

export default class HourView extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    meridiemMode: PropTypes.string.isRequired,
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.meridiemMode !== prevProps.meridiemMode) {
      this.handleChange(this.props.date.hours());
    }
  }

  handleChange = (hours) => {
    const { meridiemMode } = this.props;

    const updatedTime = this.props.date.clone().hour(hours);
    const withMeridiem = convertToMeridiem(updatedTime, meridiemMode);

    this.props.onChange(withMeridiem);
  }

  render() {
    const { date } = this.props;

    const value = date.get('hours');
    const ampmValue = Number(date.format('hh'));

    return (
      <Clock
        type={HOURS}
        onChange={this.handleChange}
        value={value}
      >
        <ClockNumber label="12" selected={ampmValue === 12} index={0} />
        <ClockNumber label="1" selected={ampmValue === 1} index={1} />
        <ClockNumber label="2" selected={ampmValue === 2} index={2} />
        <ClockNumber label="3" selected={ampmValue === 3} index={3} />
        <ClockNumber label="4" selected={ampmValue === 4} index={4} />
        <ClockNumber label="5" selected={ampmValue === 5} index={5} />
        <ClockNumber label="6" selected={ampmValue === 6} index={6} />
        <ClockNumber label="7" selected={ampmValue === 7} index={7} />
        <ClockNumber label="8" selected={ampmValue === 8} index={8} />
        <ClockNumber label="9" selected={ampmValue === 9} index={9} />
        <ClockNumber label="10" selected={ampmValue === 10} index={10} />
        <ClockNumber label="11" selected={ampmValue === 11} index={11} />
      </Clock>
    );
  }
}
