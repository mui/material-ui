import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { SECONDS } from '../constants/clock-types';
import ClockNumber from './ClockNumber';
import withUtils from '../_shared/WithUtils';

export class SecondsView extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    utils: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  handleChange = (seconds, isFinish) => {
    const { date, utils } = this.props;
    const updatedDate = utils.setSeconds(date, seconds);
    this.props.onChange(updatedDate, isFinish);
  }

  render() {
    const { date, utils } = this.props;

    const f = utils.formatNumber;
    const value = utils.getSeconds(date);

    return (
      <Clock
        type={SECONDS}
        onChange={this.handleChange}
        value={value}
      >
        <ClockNumber label={f('00')} selected={value === 0} index={12} />
        <ClockNumber label={f('05')} selected={value === 5} index={1} />
        <ClockNumber label={f('10')} selected={value === 10} index={2} />
        <ClockNumber label={f('15')} selected={value === 15} index={3} />
        <ClockNumber label={f('20')} selected={value === 20} index={4} />
        <ClockNumber label={f('25')} selected={value === 25} index={5} />
        <ClockNumber label={f('30')} selected={value === 30} index={6} />
        <ClockNumber label={f('35')} selected={value === 35} index={7} />
        <ClockNumber label={f('40')} selected={value === 40} index={8} />
        <ClockNumber label={f('45')} selected={value === 45} index={9} />
        <ClockNumber label={f('50')} selected={value === 50} index={10} />
        <ClockNumber label={f('55')} selected={value === 55} index={11} />
      </Clock>
    );
  }
}

export default withUtils()(SecondsView);

