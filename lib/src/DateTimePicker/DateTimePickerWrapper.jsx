import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withStyles from '@material-ui/core/styles/withStyles';

import DomainPropTypes from '../constants/prop-types';
import ModalWrapper from '../wrappers/ModalWrapper';
import DateTimePicker from './DateTimePicker';
import BasePicker from '../_shared/BasePicker';
import withUtils from '../_shared/WithUtils';

export const DateTimePickerWrapper = (props) => {
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
    forwardedRef,
    ...other
  } = props;

  return (
    <BasePicker {...props}>
      {
        ({
          date,
          handleAccept,
          handleChange,
          handleClear,
          handleDismiss,
          handleSetTodayDate,
          handleTextFieldChange,
          pick12hOr24hFormat,
        }) => (
          <ModalWrapper
            ref={forwardedRef}
            dialogContentClassName={classes.dialogContent}
            disableFuture={disableFuture}
            disablePast={disablePast}
            format={pick12hOr24hFormat('MMMM Do hh:mm a', 'MMMM Do HH:mm')}
            maxDate={maxDate}
            minDate={minDate}
            onAccept={handleAccept}
            onChange={handleTextFieldChange}
            onClear={handleClear}
            onDismiss={handleDismiss}
            onSetToday={handleSetTodayDate}
            value={value}
            {...other}
          >
            <DateTimePicker
              ampm={ampm}
              animateYearScrolling={animateYearScrolling}
              autoSubmit={autoSubmit}
              date={date}
              dateRangeIcon={dateRangeIcon}
              disableFuture={disableFuture}
              disablePast={disablePast}
              fadeTimeout={fadeTimeout}
              leftArrowIcon={leftArrowIcon}
              maxDate={maxDate}
              minDate={minDate}
              onChange={handleChange}
              openTo={openTo}
              renderDay={renderDay}
              rightArrowIcon={rightArrowIcon}
              shouldDisableDate={shouldDisableDate}
              showTabs={showTabs}
              timeIcon={timeIcon}
            />
          </ModalWrapper>
        )
      }
    </BasePicker>
  );
};

DateTimePickerWrapper.propTypes = {
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
  forwardedRef: PropTypes.func,
};

DateTimePickerWrapper.defaultProps = {
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
  forwardedRef: undefined,
};

const styles = {
  dialogContent: {
    width: 310,
  },
};

const EnhancedWrapper = compose(
  withUtils(),
  withStyles(styles, { name: 'MuiPickerDTPickerModal' }),
)(DateTimePickerWrapper);

export default React.forwardRef((props, ref) => <EnhancedWrapper {...props} forwardedRef={ref} />);

