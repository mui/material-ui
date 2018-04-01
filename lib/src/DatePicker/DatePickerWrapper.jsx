import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import DatePicker from './DatePicker';
import DomainPropTypes from '../constants/prop-types';
import PickerBase from '../_shared/PickerBase';
import withUtils from '../_shared/WithUtils';

export class DatePickerWrapper extends PickerBase {
  static propTypes = {
    utils: PropTypes.object.isRequired,
    /** Datepicker value */
    value: DomainPropTypes.date,
    /** Min selectable date */
    minDate: DomainPropTypes.date,
    /** Max selectable date */
    maxDate: DomainPropTypes.date,
    /** Date format string for input */
    format: PropTypes.string,
    /** Callback firing when date accepted */
    onChange: PropTypes.func.isRequired,
    /** Auto accept date on selection */
    autoOk: PropTypes.bool,
    /** Disable past dates */
    disablePast: PropTypes.bool,
    /** Disable future dates */
    disableFuture: PropTypes.bool,
    /** To animate scrolling to current year (with scrollIntoView) */
    animateYearScrolling: PropTypes.bool,
    /** Open datepicker from year selection */
    openToYearSelection: PropTypes.bool,
    /** Allow to specify dynamic label for text field labelFunc(date, invalidLabel) */
    labelFunc: PropTypes.func,
    /** Left arrow icon */
    leftArrowIcon: PropTypes.node,
    /** Right arrow icon */
    rightArrowIcon: PropTypes.node,
    /** Custom renderer for day renderDay(date, selectedDate, dayInCurrentMonth) */
    renderDay: PropTypes.func,
    /** Disable specific date */
    shouldDisableDate: PropTypes.func,
  }

  static defaultProps = {
    value: new Date(),
    format: 'MMMM Do',
    autoOk: false,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    disablePast: false,
    animateYearScrolling: false,
    openToYearSelection: false,
    leftArrowIcon: 'keyboard_arrow_left',
    rightArrowIcon: 'keyboard_arrow_right',
    renderDay: undefined,
    labelFunc: undefined,
    shouldDisableDate: undefined,
  }

  render() {
    const { date } = this.state;
    const {
      value,
      format,
      autoOk,
      onChange,
      animateYearScrolling,
      openToYearSelection,
      leftArrowIcon,
      rightArrowIcon,
      renderDay,
      labelFunc,
      utils,
      shouldDisableDate,
      minDateMessage,
      maxDateMessage,
      minDate,
      maxDate,
      disablePast,
      disableFuture,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={this.getRef}
        value={value}
        format={format}
        onClear={this.handleClear}
        onAccept={this.handleAccept}
        onChange={this.handleTextFieldChange}
        onDismiss={this.handleDismiss}
        onSetToday={this.handleSetTodayDate}
        labelFunc={labelFunc}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        minDateMessage={minDateMessage}
        maxDateMessage={maxDateMessage}
        {...other}
      >
        <DatePicker
          date={date}
          onChange={this.handleChange}
          animateYearScrolling={animateYearScrolling}
          openToYearSelection={openToYearSelection}
          leftArrowIcon={leftArrowIcon}
          rightArrowIcon={rightArrowIcon}
          renderDay={renderDay}
          utils={utils}
          minDate={minDate}
          maxDate={maxDate}
          disablePast={disablePast}
          disableFuture={disableFuture}
          shouldDisableDate={shouldDisableDate}
        />
      </ModalWrapper>
    );
  }
}

export default withUtils()(DatePickerWrapper);

