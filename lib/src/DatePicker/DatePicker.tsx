import * as React from 'react';
import { getFormatByViews } from '../_helpers/date-utils';
import { DateValidationProps, getError } from '../_helpers/text-field-helper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { BasePickerProps } from '../typings/BasePicker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import DatePickerRoot, { BaseDatePickerProps } from './DatePickerRoot';

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
    openToYearSelection,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    value,
    variant,
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
    </Wrapper>
  );
};

DatePicker.defaultProps = {
  views: ['year', 'day'],
  invalidDateMessage: 'Invalid Date Format',
  minDateMessage: 'Date should not be before minimal date',
  maxDateMessage: 'Date should not be after maximal date',
};

export default React.forwardRef((props: DatePickerProps, ref) => (
  <DatePicker {...props} forwardedRef={ref} />
));
