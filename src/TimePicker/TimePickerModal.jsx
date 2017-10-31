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
    returnMoment: PropTypes.bool,
    invalidLabel: PropTypes.string,
  }

  static defaultProps = {
    value: new Date(),
    format: 'hh:mm A',
    autoOk: false,
    returnMoment: true,
    invalidLabel: undefined,
  }

  /* eslint-disable react/sort-comp */
  getValidDateOrCurrent = () => {
    const date = moment(this.props.value);

    return date.isValid() ? date : moment();
  }

  state = {
    date: this.getValidDateOrCurrent(),
  }

  handleChange = (date, isFinish) => {
    this.setState({ date }, () => {
      if (isFinish && this.props.autoOk) {
        this.handleAccept();
        this.togglePicker();
      }
    });
  }

  handleAccept = () => {
    const dateToReturn = this.props.returnMoment
      ? this.state.date
      : this.state.date.toDate();

    this.props.onChange(dateToReturn);
  }

  handleDismiss = () => {
    this.setState({ date: this.getValidDateOrCurrent() });
  }

  togglePicker = () => {
    this.wrapper.togglePicker();
  }

  render() {
    const { date } = this.state;
    const {
      value, format, autoOk, onChange, returnMoment, invalidLabel,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={(node) => { this.wrapper = node; }}
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        invalidLabel={invalidLabel}
        {...other}
      >
        <TimePicker
          date={date}
          onChange={this.handleChange}
        />
      </ModalWrapper>
    );
  }
}
