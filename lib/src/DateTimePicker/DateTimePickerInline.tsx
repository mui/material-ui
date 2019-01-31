import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
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
    minutesStep,
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
            minutesStep={minutesStep}
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

export default React.forwardRef((props: DateTimePickerInlineProps, ref) => (
  <DateTimePickerInline {...props} forwardedRef={ref} />
));
