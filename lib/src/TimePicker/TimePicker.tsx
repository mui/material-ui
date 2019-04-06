import * as React from 'react';
import { BaseValidationProps, getError, pick12hOr24hFormat } from '../_helpers/text-field-helper';
import { usePickerState } from '../_shared/hooks/usePickerState';
import { useUtils } from '../_shared/hooks/useUtils';
import { PureDateInput, PureDateInputProps } from '../_shared/PureDateInput';
import { timePickerDefaultProps } from '../constants/prop-types';
import { BasePickerProps } from '../typings/BasePicker';
import { ExtendWrapper, Wrapper } from '../wrappers/Wrapper';
import TimePickerRoot, { BaseTimePickerProps } from './TimePickerRoot';

export type TimePickerProps = BasePickerProps &
  BaseValidationProps &
  BaseTimePickerProps &
  ExtendWrapper<PureDateInputProps>;

export const TimePicker: React.FC<TimePickerProps> = props => {
  const {
    ampm,
    seconds,
    minutesStep,
    autoOk,
    format,
    forwardedRef,
    initialFocusedDate,
    labelFunc,
    invalidDateMessage,
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

TimePicker.defaultProps = timePickerDefaultProps;

export default React.forwardRef((props: TimePickerProps, ref) => (
  <TimePicker {...props} forwardedRef={ref} />
));
