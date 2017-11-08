import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';
import DomainPropTypes from '../constants/prop-types';
import PickerBase from '../_shared/PickerBase';

export default class DatePickerWrapper extends PickerBase {
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
    invalidLabel: PropTypes.string,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
  }

  static defaultProps = {
    value: new Date(),
    format: 'MMMM Do',
    autoOk: false,
    returnMoment: true,
    minDate: undefined,
    maxDate: undefined,
    disableFuture: undefined,
    animateYearScrolling: undefined,
    openToYearSelection: undefined,
    invalidLabel: undefined,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
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
      invalidLabel,
      leftArrowIcon,
      rightArrowIcon,
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
        <DatePicker
          date={date}
          onChange={this.handleChange}
          disableFuture={disableFuture}
          animateYearScrolling={animateYearScrolling}
          openToYearSelection={openToYearSelection}
          minDate={minDate}
          maxDate={maxDate}
          leftArrowIcon={leftArrowIcon}
          rightArrowIcon={rightArrowIcon}
        />
      </ModalWrapper>
    );
  }
}
