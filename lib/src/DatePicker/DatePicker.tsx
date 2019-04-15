import * as React from 'react';
import DatePickerRoot, { BaseDatePickerProps } from './DatePickerRoot';
import { useUtils } from '../_shared/hooks/useUtils';
import { BasePickerProps } from '../typings/BasePicker';
import { getFormatByViews } from '../_helpers/date-utils';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { datePickerDefaultProps } from '../constants/prop-types';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { DateValidationProps, getError } from '../_helpers/text-field-helper';

export type DatePickerProps = BasePickerProps &
  DateValidationProps &
  BaseDatePickerProps &
  ExtendWrapper<PureDateInputProps>;

export const DatePicker: React.FC<DatePickerProps> = props => {
  const {
    allowKeyboardControl,
    animateYearScrolling,
    autoOk,
    disableFuture,
    disablePast,
    format,
    forwardedRef,
    initialFocusedDate,
    invalidDateMessage,
    labelFunc,
    leftArrowIcon,
    leftArrowButtonProps,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
    onAccept,
    onChange,
    onMonthChange,
    onYearChange,
    onOpen,
    onClose,
    openTo,
    renderDay,
    rightArrowIcon,
    rightArrowButtonProps,
    shouldDisableDate,
    value,
    variant,
    onlyCalendar,
    views,
    ...other
  } = props;

  const utils = useUtils();
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, {
    getDefaultFormat: () => getFormatByViews(views!, utils),
    getValidationError: () => getError(value, utils, props),
  });

  return (
    <Wrapper
      variant={variant}
      InputComponent={PureDateInput}
      DateInputProps={inputProps}
      {...wrapperProps}
      {...other}
    >
      <DatePickerRoot
        {...pickerProps}
        onlyCalendar={onlyCalendar}
        allowKeyboardControl={allowKeyboardControl}
        animateYearScrolling={animateYearScrolling}
        disableFuture={disableFuture}
        disablePast={disablePast}
        leftArrowIcon={leftArrowIcon}
        leftArrowButtonProps={leftArrowButtonProps}
        maxDate={maxDate}
        minDate={minDate}
        renderDay={renderDay}
        rightArrowIcon={rightArrowIcon}
        rightArrowButtonProps={rightArrowButtonProps}
        shouldDisableDate={shouldDisableDate}
        views={views}
        openTo={openTo}
      />
    </Wrapper>
  );
};

DatePicker.defaultProps = datePickerDefaultProps;

export default React.forwardRef((props: DatePickerProps, ref) => (
  <DatePicker {...props} forwardedRef={ref} />
));
