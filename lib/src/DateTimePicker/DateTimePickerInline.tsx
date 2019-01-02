import * as PropTypes from 'prop-types';
import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import InlineWrapper, { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import DateTimePicker, { BaseDateTimePickerProps } from './DateTimePicker';

export interface DateTimePickerInlineProps
  extends BasePickerProps,
    BaseDateTimePickerProps,
    ExtendWrapper<OuterInlineWrapperProps> {}

export const DateTimePickerInline: React.SFC<DateTimePickerInlineProps> = props => {
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

  return (
    <BasePicker {...props} autoOk>
      {({
        date,
        utils,
        handleChange,
        handleTextFieldChange,
        isAccepted,
        pick12hOr24hFormat,
        handleAccept,
      }) => (
        <InlineWrapper
          innerRef={forwardedRef}
          disableFuture={disableFuture}
          disablePast={disablePast}
          maxDate={maxDate}
          minDate={minDate}
          onChange={handleTextFieldChange}
          value={value}
          isAccepted={isAccepted}
          handleAccept={handleAccept}
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
            showTabs={showTabs}
            timeIcon={timeIcon}
          />
        </InlineWrapper>
      )}
    </BasePicker>
  );
};

(DateTimePickerInline as any).propTypes = {
  value: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoOk: PropTypes.bool,
  autoSubmit: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  minDate: DomainPropTypes.date,
  maxDate: DomainPropTypes.date,
  initialFocusedDate: DomainPropTypes.date,
  showTabs: PropTypes.bool,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  dateRangeIcon: PropTypes.node,
  timeIcon: PropTypes.node,
  renderDay: PropTypes.func,
  ampm: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  animateYearScrolling: PropTypes.bool,
  openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

(DateTimePickerInline as any).defaultProps = {
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
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time',
  renderDay: undefined,
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false,
  forwardedRef: undefined,
  allowKeyboardControl: true,
};

export default React.forwardRef((props: DateTimePickerInlineProps, ref) => (
  <DateTimePickerInline {...props} forwardedRef={ref} />
));
