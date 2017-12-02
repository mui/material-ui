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
    const currentHours = date.get('hours');

    const hourNumbers = [];
    const startHour = ampm ? 1 : 0;
    const endHour = ampm ? 12 : 23;

    const isSelected = (hour) => {
      if (ampm) {
        if (hour === 12) {
          return currentHours === 12 || currentHours === 0;
        }

        return currentHours === hour || currentHours - 12 === hour;
      }

      return currentHours === hour;
    };


    for (let hour = startHour; hour <= endHour; hour += 1) {
      let label = hour.toString();

      if (hour === 0) {
        label = '00';
      }

      const props = {
        index: hour,
        label: utils.formatNumber(label),
        selected: isSelected(hour),
        isInner: !ampm && (hour === 0 || hour > 12),
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
    const { date, ampm } = this.props;
    const value = date.get('hours');

    return (
      <Clock
        type={HOURS}
        value={value}
        ampm={ampm}
        onChange={this.handleChange}
      >
        { this.getHourNumbers() }
      </Clock>
    );
  }
}
