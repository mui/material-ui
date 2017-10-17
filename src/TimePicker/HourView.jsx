import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';

export default class HourView extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange = (hours) => {
    const updatedDate = this.props.date.clone().hour(hours);
    this.props.onChange(updatedDate);
  }

  render() {
    const value = this.props.date.get('hours');
    return (
      <Clock
        type={HOURS}
        onChange={this.handleChange}
        value={value}
      />
    );
  }
}
