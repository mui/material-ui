import * as React from 'react';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
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

export default React.forwardRef((props: DateTimePickerModalProps, ref) => (
  <DateTimePickerModal {...props} forwardedRef={ref} />
));
