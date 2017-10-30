import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';
import DomainPropTypes from '../constants/prop-types';

export default class DatePickerModal extends PureComponent {
  static propTypes = {
    value: DomainPropTypes.date,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
    returnMoment: PropTypes.bool,
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
    returnMoment: true,
  }

  state = {
    date: moment(this.props.value),
  }

  handleChange = (date) => {
    this.setState({ date }, () => {
      if (this.props.autoOk) {
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
    this.setState({ date: moment(this.props.value) });
  }

  togglePicker = () => {
    this.wrapper.togglePicker();
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
      returnMoment,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={(node) => { this.wrapper = node; }}
        value={value}
        format={format}
        onAccept={this.handleAccept}
        onDismiss={this.handleDismiss}
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
