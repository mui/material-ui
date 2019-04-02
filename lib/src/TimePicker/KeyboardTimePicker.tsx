import * as React from 'react';
import { DateValidationProps, getError, pick12hOr24hFormat } from '../_helpers/text-field-helper';
import {
  BaseKeyboardPickerProps,
  useKeyboardPickerState,
} from '../_shared/hooks/useKeyboardPickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import KeyboardDateInput, { KeyboardDateInputProps } from '../_shared/KeyboardDateInput';
import { ExtendWrapper2, Wrapper } from '../wrappers/Wrapper';
import TimePicker from './TimePicker';
import TimePickerRoot, { BaseTimePickerProps } from './TimePickerRoot';

export type KeyboardTimePickerProps = BaseTimePickerProps &
  DateValidationProps &
  BaseKeyboardPickerProps &
  ExtendWrapper2<KeyboardDateInputProps>;

export function KeyboardTimePicker(props: KeyboardTimePickerProps) {
  const {
    ampm,
    seconds,
    minutesStep,
    variant,
    format,
    forwardedRef,
    initialFocusedDate,
    invalidDateMessage,
    labelFunc,
    maxDate,
    maxDateMessage,
    minDate,
    minDateMessage,
    onAccept,
    onChange,
    value,
    ...other
  } = props;

  const utils = useUtils();
  const { pickerProps, inputProps, wrapperProps } = useKeyboardPickerState(props, {
    getValidationError: () => getError(value, utils, props as any),
    getDefaultFormat: () =>
      pick12hOr24hFormat(format, ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat,
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
      <TimePickerRoot {...pickerProps} ampm={ampm} seconds={seconds} minutesStep={minutesStep} />
    </Wrapper>
  );
}

KeyboardTimePicker.defaultProps = TimePicker.defaultProps;

export default React.forwardRef((props: KeyboardTimePickerProps, ref) => (
  <KeyboardTimePicker {...props} forwardedRef={ref} />
));
