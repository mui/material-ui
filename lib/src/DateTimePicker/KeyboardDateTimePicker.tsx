import * as React from 'react';
import { DateValidationProps, getError, pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { toShowDateTimePickerTabs } from '../_helpers/utils';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import KeyboardDateInput, { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import DateTimePicker from './DateTimePicker';
import DateTimePickerRoot, { BaseDateTimePickerProps } from './DateTimePickerRoot';

export type KeyboardDateTimePickerProps = BaseDateTimePickerProps &
  DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper<KeyboardDateInputProps>;

export function KeyboardDateTimePicker(props: KeyboardDateTimePickerProps) {
  const {
    allowKeyboardControl,
    ampm,
    animateYearScrolling,
    autoOk,
    autoSubmit,
    dateRangeIcon,
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
    onOpen,
    onClose,
    minDateMessage,
    minutesStep,
    onAccept,
    onChange,
    onMonthChange,
    onYearChange,
    openTo,
    renderDay,
    rightArrowIcon,
    shouldDisableDate,
    showTabs,
    timeIcon,
    value,
    variant,
    ...other
  } = props;

  const utils = useUtils();
  const toShowTabs = toShowDateTimePickerTabs(showTabs);
  const { pickerProps, inputProps, wrapperProps } = useKeyboardPickerState(props, {
    getValidationError: () => getError(value, utils, props as any),
    getDefaultFormat: () =>
      pick12hOr24hFormat(format, ampm, {
        '12h': utils.dateTime12hFormat,
        '24h': utils.dateTime24hFormat,
      }),
  });

  return (
    <Wrapper
      variant={variant}
      InputComponent={KeyboardDateInput}
      DateInputProps={inputProps}
      {...wrapperProps}
      {...other}
    >
      <DateTimePickerRoot
        {...pickerProps}
        ampm={ampm}
        allowKeyboardControl={allowKeyboardControl}
        minutesStep={minutesStep}
        animateYearScrolling={animateYearScrolling}
        autoSubmit={autoSubmit}
        dateRangeIcon={dateRangeIcon}
        disableFuture={disableFuture}
        disablePast={disablePast}
        leftArrowIcon={leftArrowIcon}
        maxDate={maxDate}
        minDate={minDate}
        onMonthChange={onMonthChange}
        onYearChange={onYearChange}
        openTo={openTo}
        renderDay={renderDay}
        rightArrowIcon={rightArrowIcon}
        shouldDisableDate={shouldDisableDate}
        showTabs={toShowTabs}
        timeIcon={timeIcon}
      />
    </Wrapper>
  );
}

KeyboardDateTimePicker.defaultProps = DateTimePicker.defaultProps;

export default React.forwardRef((props: KeyboardDateTimePickerProps, ref) => (
  <KeyboardDateTimePicker {...props} forwardedRef={ref} />
));
