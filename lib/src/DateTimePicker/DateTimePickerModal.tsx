import * as PropTypes from 'prop-types';
import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import DateTimePicker, { BaseDateTimePickerProps } from './DateTimePicker';

export interface DateTimePickerModalProps
  extends BasePickerProps,
    BaseDateTimePickerProps,
    ExtendWrapper<ModalWrapperProps> {}

export const DateTimePickerModal: React.SFC<DateTimePickerModalProps> = props => {
  const {
    value,
    format,
    autoOk,
    openTo,
    minDate,
    maxDate,
    initialFocusedDate,
    showTabs,
    autoSubmit,
    disablePast,
    disableFuture,
    leftArrowIcon,
    rightArrowIcon,
    dateRangeIcon,
    timeIcon,
    renderDay,
    ampm,
    shouldDisableDate,
    animateYearScrolling,
    forwardedRef,
    allowKeyboardControl,
    ...other
  } = props;

  // do not show tabs for small screens
  const toShowTabs = showTabs && typeof window !== 'undefined' && window.innerHeight > 667;
  return (
    <BasePicker {...props}>
      {({
        date,
        utils,
        handleAccept,
        handleChange,
        handleClear,
        handleDismiss,
        handleSetTodayDate,
        handleTextFieldChange,
        isAccepted,
        pick12hOr24hFormat,
      }) => (
        <ModalWrapper
          showTabs={toShowTabs}
          ref={forwardedRef}
          disableFuture={disableFuture}
          disablePast={disablePast}
          maxDate={maxDate}
          minDate={minDate}
          onAccept={handleAccept}
          onChange={handleTextFieldChange}
          onClear={handleClear}
          onDismiss={handleDismiss}
          onSetToday={handleSetTodayDate}
          value={value}
          isAccepted={isAccepted}
          format={pick12hOr24hFormat(utils.dateTime12hFormat, utils.dateTime24hFormat)}
          {...other}
        >
          <DateTimePicker
            allowKeyboardControl={allowKeyboardControl}
            ampm={ampm}
            animateYearScrolling={animateYearScrolling}
            autoSubmit={autoSubmit}
            date={date}
            dateRangeIcon={dateRangeIcon}
            disableFuture={disableFuture}
            disablePast={disablePast}
            leftArrowIcon={leftArrowIcon}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleChange}
            openTo={openTo}
            renderDay={renderDay}
            rightArrowIcon={rightArrowIcon}
            shouldDisableDate={shouldDisableDate}
            showTabs={toShowTabs}
            timeIcon={timeIcon}
          />
        </ModalWrapper>
      )}
    </BasePicker>
  );
};

(DateTimePickerModal as any).propTypes = {
  /** Date-time picker value */
  value: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted [(date: Date) => void] */
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
  /** Initial focused date when calendar opens, if no value is provided */
  initialFocusedDate: DomainPropTypes.date,
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
  /**
   * Custom renderer for day
   * [(date: Date, nowSelectedDate: Date, isInCurrentMonth: boolean) => ReactElement]
   */
  renderDay: PropTypes.func,
  /** 12h/24h view for hour selection clock */
  ampm: PropTypes.bool,
  /** Disable specific date [(date: Date) => boolean] */
  shouldDisableDate: PropTypes.func,
  /** Enable animated scrolling to current year */
  animateYearScrolling: PropTypes.bool,
  /** Open directly to particular view */
  openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
  /** Enables keyboard listener for moving between days in calendar */
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

DateTimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  autoSubmit: true,
  openTo: 'date',
  disableFuture: false,
  disablePast: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  initialFocusedDate: undefined,
  showTabs: true,
  leftArrowIcon: undefined,
  rightArrowIcon: undefined,
  dateRangeIcon: undefined,
  timeIcon: undefined,
  renderDay: undefined,
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false,
  forwardedRef: undefined,
  allowKeyboardControl: true,
};

export default React.forwardRef((props: DateTimePickerModalProps, ref) => (
  <DateTimePickerModal {...props} forwardedRef={ref} />
));
