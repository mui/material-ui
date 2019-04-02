import * as React from 'react';
import { getError, pick12hOr24hFormat } from '../_helpers/text-field-helper';
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
    getValidationError: () => getError(value, utils, props),
    getDefaultFormat: () =>
      pick12hOr24hFormat(format, ampm, {
        '12h': utils.time12hFormat,
        '24h': utils.time24hFormat,
      }),
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
  ampm: true,
};

export default React.forwardRef((props: TimePickerProps, ref) => (
  <DatePicker {...props} forwardedRef={ref} />
));
