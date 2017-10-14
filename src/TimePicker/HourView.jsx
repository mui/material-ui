import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from './Clock';
import { HOURS } from '../constants/clock-types';

export default class HourView extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
  }

  render() {
    const value = this.props.date.get('hours');
    return (
      <Clock types={HOURS} value={value} />
    );
  }
}
