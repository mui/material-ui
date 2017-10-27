import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';

export default class DatePickerModal extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    minDate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    maxDate: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
  }

  static defaultProps = {
    value: new Date(),
    format: 'MMMM Do',
    autoOk: false,
    minDate: undefined,
    maxDate: undefined,
    disableFuture: undefined,
    animateYearScrolling: undefined,
    openToYearSelection: undefined,
  }

  state = {
    date: moment(this.props.value),
  }

  handleChange = (date) => {
    this.setState({ date }, () => {
      if (this.props.autoOk) {
        this.handleAccept();
      }
    });
  }

  handleAccept = () => {
    this.props.onChange(this.state.date);
  }

  handleDismiss = () => {
    this.setState({ date: moment(this.props.value) });
  }

  render() {
    const { date } = this.state;
    const {
      value,
      format,
      autoOk,
      minDate,
      maxDate,
      onChange,
      disableFuture,
      animateYearScrolling,
      openToYearSelection,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
        date={date}
        {...other}
      >
        <DatePicker
          date={date}
          onChange={this.handleChange}
          disableFuture={disableFuture}
          animateYearScrolling={animateYearScrolling}
          openToYearSelection={openToYearSelection}
          minDate={minDate}
          maxDate={maxDate}
        />
      </ModalWrapper>
    );
  }
}
