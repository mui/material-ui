import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';

export default class TimePickerModal extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    format: 'hh:mm A',
    autoOk: false,
  }

  state = {
    time: moment(this.props.value),
  }

  handleChange = (time, isFinish) => {
    this.setState({ time }, () => {
      if (isFinish && this.props.autoOk) {
        this.handleAccept();
        this.togglePicker();
      }
    });
  }

  handleAccept = () => {
    this.props.onChange(this.state.time);
  }

  handleDismiss = () => {
    this.setState({ time: moment(this.props.value) });
  }

  togglePicker = () => {
    this.wrapper.togglePicker();
  }

  render() {
    const { time } = this.state;
    const {
      value, format, autoOk, onChange,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={(node) => { this.wrapper = node; }}
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        date={time}
        {...other}
      >
        <TimePicker
          date={time}
          onChange={this.handleChange}
        />
      </ModalWrapper>
    );
  }
}
