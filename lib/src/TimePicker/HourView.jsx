import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';
import ClockNumber from './ClockNumber';
import * as defaultUtils from '../_shared/utils';


export default class HourView extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    utils: PropTypes.object,
  }

  static defaultProps = {
    utils: defaultUtils,
  }

  handleChange = (hours, isFinish) => {
    const updatedTime = this.props.date.clone().hour(hours);

    this.props.onChange(updatedTime, isFinish);
  }

  render() {
    const { date, utils } = this.props;

    const f = utils.formatNumber;
    const value = date.get('hours');
    const ampmValue = Number(date.format('hh'));

    return (
      <Clock
        type={HOURS}
        onChange={this.handleChange}
        value={value}
      >
        <ClockNumber label={f('12')} selected={ampmValue === 12} index={0} />
        <ClockNumber label={f('1')} selected={ampmValue === 1} index={1} />
        <ClockNumber label={f('2')} selected={ampmValue === 2} index={2} />
        <ClockNumber label={f('3')} selected={ampmValue === 3} index={3} />
        <ClockNumber label={f('4')} selected={ampmValue === 4} index={4} />
        <ClockNumber label={f('5')} selected={ampmValue === 5} index={5} />
        <ClockNumber label={f('6')} selected={ampmValue === 6} index={6} />
        <ClockNumber label={f('7')} selected={ampmValue === 7} index={7} />
        <ClockNumber label={f('8')} selected={ampmValue === 8} index={8} />
        <ClockNumber label={f('9')} selected={ampmValue === 9} index={9} />
        <ClockNumber label={f('10')} selected={ampmValue === 10} index={10} />
        <ClockNumber label={f('11')} selected={ampmValue === 11} index={11} />
      </Clock>
    );
  }
}
