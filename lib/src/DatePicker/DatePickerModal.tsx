import * as React from 'react';
import { getFormatByViews } from '../_helpers/date-utils';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import DatePicker, { BaseDatePickerProps } from './DatePicker';

export interface DatePickerModalProps
  extends BasePickerProps,
    BaseDatePickerProps,
    ExtendWrapper<ModalWrapperProps> {}

export const DatePickerModal: React.SFC<DatePickerModalProps> = props => {
  const {
    allowKeyboardControl,
    animateYearScrolling,
    autoOk,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    labelFunc,
    leftArrowIcon,
    maxDate,
    minDate,
    initialFocusedDate,
    onChange,
    openToYearSelection,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    value,
    views,
    openTo,
    onMonthChange,
    onYearChange,
    ...other
  } = props;

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
      }) => (
        <ModalWrapper
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format || getFormatByViews(views!, utils)}
          labelFunc={labelFunc}
          maxDate={maxDate}
          minDate={minDate}
          onAccept={handleAccept}
          onChange={handleTextFieldChange}
          onClear={handleClear}
          onDismiss={handleDismiss}
          onSetToday={handleSetTodayDate}
          ref={forwardedRef}
          value={value}
          isAccepted={isAccepted}
          {...other}
        >
          <DatePicker
            date={date}
            allowKeyboardControl={allowKeyboardControl}
            animateYearScrolling={animateYearScrolling}
            disableFuture={disableFuture}
            disablePast={disablePast}
            leftArrowIcon={leftArrowIcon}
            maxDate={maxDate}
            minDate={minDate}
            onChange={handleChange}
            openToYearSelection={openToYearSelection}
            renderDay={renderDay}
            rightArrowIcon={rightArrowIcon}
            shouldDisableDate={shouldDisableDate}
            views={views}
            openTo={openTo}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}
          />
        </ModalWrapper>
      )}
    </BasePicker>
  );
};

DatePickerModal.defaultProps = {
  views: ['year', 'day'],
};

export default React.forwardRef((props: DatePickerModalProps, ref) => (
  <DatePickerModal {...props} forwardedRef={ref} />
));
