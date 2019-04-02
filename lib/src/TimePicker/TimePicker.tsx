import * as React from 'react';
import { getError } from '../_helpers/text-field-helper';
import { BasePickerProps } from '../_shared/BasePicker';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { ExtendWrapper2, Wrapper } from '../wrappers/Wrapper';
import TimePickerRoot, { BaseTimePickerProps } from './TimePickerRoot';

export type TimePickerProps = BasePickerProps &
  BaseTimePickerProps &
  ExtendWrapper2<PureDateInputProps>;

export const DatePicker: React.FC<TimePickerProps> = props => {
  const {
    ampm,
    seconds,
    minutesStep,
    autoOk,
    format,
    forwardedRef,
    initialFocusedDate,
    labelFunc,
    maxDate,
    minDate,
    onAccept,
    onChange,
    value,
    variant,
    ...other
  } = props;

  const utils = useUtils();
  const { pickerProps, inputProps, wrapperProps } = usePickerState(props, {
    getDefaultFormat: () => (ampm ? utils.time12hFormat : utils.time24hFormat),
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
      <TimePickerRoot {...pickerProps} ampm={ampm} seconds={seconds} minutesStep={minutesStep} />
    </Wrapper>
  );
};

DatePicker.defaultProps = {
  ampm: false,
};

export default React.forwardRef((props: TimePickerProps, ref) => (
  <DatePicker {...props} forwardedRef={ref} />
));
