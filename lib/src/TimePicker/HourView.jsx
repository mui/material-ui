import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';
import ClockNumber from './ClockNumber';
import * as defaultUtils from '../utils/utils';

export default class HourView extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    utils: PropTypes.object,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    utils: defaultUtils,
    ampm: true,
  }

  getHourNumbers = () => {
    const { ampm, utils, date } = this.props;

    const hourNumbers = [];
    const hourSize = ampm ? 12 : 24;
    const currentHours = date.get('hours');

    const isSelected = hour =>
      currentHours === hour || (ampm && currentHours - 12 === hour);

    for (let hour = 1; hour <= hourSize; hour += 1) {
      let label = hour.toString();

      if (hour === 24) {
        label = '00';
      }

      const props = {
        index: hour,
        label: utils.formatNumber(label),
        selected: isSelected(hour),
        isInner: !ampm && hour >= 12,
      };

      hourNumbers.push(<ClockNumber key={hour} {...props} />);
    }

    return hourNumbers;
  }

  handleChange = (hours, isFinish) => {
    const updatedTime = this.props.date.clone().hour(hours);

    this.props.onChange(updatedTime, isFinish);
  }

  render() {
    const { date } = this.props;
    const value = date.get('hours');

    return (
      <Clock
        type={HOURS}
        onChange={this.handleChange}
        value={value}
      >
        { this.getHourNumbers() }
      </Clock>
    );
  }
}
