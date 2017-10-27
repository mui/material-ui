import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';

export default class DatePickerModal extends PureComponent {
  static propTypes = {
    minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    format: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    disableFuture: PropTypes.bool,
    animateYearScrolling: PropTypes.bool,
    openToYearSelection: PropTypes.bool,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    value: null,
    format: 'MMMM Do',
    autoOk: false,
    disableFuture: false,
    animateYearScrolling: false,
    openToYearSelection: false,
  }

  state = {
    open: false,
    date: moment(this.props.value),
  }

  togglePicker = () => {
    this.setState({ open: !this.state.open });
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
    this.togglePicker(); // close
  }

  handleDismiss = () => {
    this.setState({
      date: moment(this.props.value),
    });

    this.togglePicker();
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
