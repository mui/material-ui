import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import DomainPropTypes from '../constants/prop-types';
import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';
import PickerBase from '../_shared/PickerBase';
import withUtils from '../_shared/WithUtils';

export class DateTimePickerWrapper extends PickerBase {
  static propTypes = {
    utils: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    /** DateTimepicker value */
    value: DomainPropTypes.date,
    /** Date format string for input */
    format: PropTypes.string,
    /** Callback firing when date accepted */
    onChange: PropTypes.func.isRequired,
    /** Auto accept date on minute selection */
    autoOk: PropTypes.bool,
    /** Move to the next part of date on select (year -> date -> hour -> minute) */
    autoSubmit: PropTypes.bool,
    /** Disable future dates */
    disableFuture: PropTypes.bool,
    /** Disable past dates */
    disablePast: PropTypes.bool,
    /** Min selectable date */
    minDate: DomainPropTypes.date,
    /** Max selectable date */
    maxDate: DomainPropTypes.date,
    /** Show date/time tabs */
    showTabs: PropTypes.bool,
    /** Left arrow icon */
    leftArrowIcon: PropTypes.node,
    /** Right arrow icon */
    rightArrowIcon: PropTypes.node,
    /** Date tab icon */
    dateRangeIcon: PropTypes.node,
    /** Time tab icon */
    timeIcon: PropTypes.node,
    /** Custom renderer for day renderDay(date, selectedDate, dayInCurrentMonth) */
    renderDay: PropTypes.func,
    /** 12h/24h view for hour selection clock */
    ampm: PropTypes.bool,
    /** Disable specific date */
    shouldDisableDate: PropTypes.func,
    /** Enable animated scrolling to current year */
    animateYearScrolling: PropTypes.bool,
    /** Open directly to particular view */
    openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
    /** Switching hour/minutes animation timeout in milliseconds (set 0 to disable) */
    fadeTimeout: PropTypes.number,
  }

  static defaultProps = {
    value: new Date(),
    format: undefined,
    autoOk: false,
    autoSubmit: true,
    openTo: 'date',
    disableFuture: false,
    disablePast: false,
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    showTabs: true,
    leftArrowIcon: 'keyboard_arrow_left',
    rightArrowIcon: 'keyboard_arrow_right',
    dateRangeIcon: 'date_range',
    timeIcon: 'access_time',
    renderDay: undefined,
    ampm: true,
    shouldDisableDate: undefined,
    animateYearScrolling: false,
    fadeTimeout: 400,
  }

  default12hFormat = 'MMMM Do hh:mm a'
  default24hFormat = 'MMMM Do HH:mm'

  render() {
    const { date } = this.state;
    const {
      value,
      format,
      autoOk,
      openTo,
      classes,
      minDate,
      maxDate,
      showTabs,
      autoSubmit,
      disablePast,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      renderDay,
      utils,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      fadeTimeout,
      ...other
    } = this.props;

    return (
      <ModalWrapper
        ref={this.getRef}
        value={value}
        format={this.getFormat()}
        onAccept={this.handleAccept}
        onChange={this.handleTextFieldChange}
        onDismiss={this.handleDismiss}
        onClear={this.handleClear}
        onSetToday={this.handleSetTodayDate}
        dialogContentClassName={classes.dialogContent}
        minDate={minDate}
        maxDate={maxDate}
        disablePast={disablePast}
        disableFuture={disableFuture}
        {...other}
      >
        <DateTimePicker
          date={date}
          ampm={ampm}
          openTo={openTo}
          autoSubmit={autoSubmit}
          onChange={this.handleChange}
          disablePast={disablePast}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
          showTabs={showTabs}
          leftArrowIcon={leftArrowIcon}
          rightArrowIcon={rightArrowIcon}
          dateRangeIcon={dateRangeIcon}
          timeIcon={timeIcon}
          renderDay={renderDay}
          fadeTimeout={fadeTimeout}
          shouldDisableDate={shouldDisableDate}
          animateYearScrolling={animateYearScrolling}
        />
      </ModalWrapper>
    );
  }
}

const styles = {
  dialogContent: {
    width: 310,
  },
};

export default withStyles(styles, { name: 'MuiPickerDTPickerModal' })(withUtils()(DateTimePickerWrapper));

