import * as React from 'react';
import { getFormatByViews } from '../_helpers/date-utils';
import { BasePickerProps } from '../_shared/BasePicker';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import { ModalWrapper, ModalWrapperProps } from '../wrappers/ModalWrapper';
import DatePicker, { BaseDatePickerProps } from './DatePicker';

export interface DatePickerModalProps
  extends BasePickerProps,
    BaseDatePickerProps,
    ExtendWrapper<ModalWrapperProps, PureDateInputProps> {}

export function DatePickerModal(props: DatePickerModalProps) {
  const {
    onAccept,
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

  const utils = useUtils();
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, () =>
    getFormatByViews(views!, utils)
  );

  return (
    <ModalWrapper
      InputComponent={PureDateInput}
      DateInputProps={inputProps}
      {...wrapperProps}
      {...other}
    >
      <DatePicker
        {...pickerProps}
        allowKeyboardControl={allowKeyboardControl}
        animateYearScrolling={animateYearScrolling}
        disableFuture={disableFuture}
        disablePast={disablePast}
        leftArrowIcon={leftArrowIcon}
        maxDate={maxDate}
        minDate={minDate}
        openToYearSelection={openToYearSelection}
        renderDay={renderDay}
        rightArrowIcon={rightArrowIcon}
        shouldDisableDate={shouldDisableDate}
        views={views}
        openTo={openTo}
      />
    </ModalWrapper>
  );
}

DatePickerModal.defaultProps = {
  views: ['year', 'day'],
};

export default React.forwardRef((props: DatePickerModalProps, ref) => (
  <DatePickerModal {...props} forwardedRef={ref} />
));
