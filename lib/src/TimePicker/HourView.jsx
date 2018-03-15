import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';
import ClockNumber from './ClockNumber';
import withUtils from '../_shared/WithUtils';

export class HourView extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
    ampm: PropTypes.bool,
  }

  static defaultProps = {
    ampm: true,
  }

  getHourNumbers = () => {
    const { ampm, utils, date } = this.props;
    const currentHours = utils.getHours(date);

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
    const { date, utils } = this.props;
    const updatedTime = utils.setHours(date, hours);

    this.props.onChange(updatedTime, isFinish);
  }

  render() {
    const { date, ampm, utils } = this.props;
    const value = utils.getHours(date);

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

export default withUtils()(HourView);

