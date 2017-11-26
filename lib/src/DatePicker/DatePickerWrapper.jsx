import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';
import DomainPropTypes from '../constants/prop-types';
import PickerBase from '../_shared/PickerBase';
import * as defaultUtils from '../_shared/utils';

export default class DatePickerWrapper extends PickerBase {
  static propTypes = {
    /* Datepicker value */
    value: DomainPropTypes.date,
    /* Min selectable date */
    minDate: DomainPropTypes.date,
    /* Max selectable date */
    maxDate: DomainPropTypes.date,
    /* Moment format string for input */
    format: PropTypes.string,
    /* Callback firing when date accepted */
    onChange: PropTypes.func.isRequired,
    /* Auto accept date on selection */
    autoOk: PropTypes.bool,
    /* Disable future dates */
    disableFuture: PropTypes.bool,
    /* To animate scrolling to current year (with scrollIntoView) */
    animateYearScrolling: PropTypes.bool,
    /* Open datepicker from year selection */
    openToYearSelection: PropTypes.bool,
    /* Return moment object in onChange event */
    returnMoment: PropTypes.bool,
    /* Displayed string if date can`t be parsed (or null) */
    invalidLabel: PropTypes.string,
    /* Allow to specify dynamic label for text field labelFunc(date, invalidLabel) */
    labelFunc: PropTypes.func,
    /* Left arrow icon */
    leftArrowIcon: PropTypes.node,
    /* Right arrow icon */
    rightArrowIcon: PropTypes.node,
    /* Custom renderer for day renderDay(date, selectedDate, dayInCurrentMonth) */
    renderDay: PropTypes.func,
    /* Date displaying utils */
    utils: PropTypes.object,
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
    renderDay: undefined,
    labelFunc: undefined,
    utils: defaultUtils,
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
      renderDay,
      labelFunc,
      utils,
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
        labelFunc={labelFunc}
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
          renderDay={renderDay}
          utils={utils}
        />
      </ModalWrapper>
    );
  }
}
