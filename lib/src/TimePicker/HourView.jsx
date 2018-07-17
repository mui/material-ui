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

  g

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

