import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import TimePicker, { BaseTimePickerProps } from './TimePicker';

export interface TimePickerModalProps
  extends BasePickerProps,
    BaseTimePickerProps,
    ExtendWrapper<ModalWrapperProps> {}

export const TimePickerModal: React.SFC<TimePickerModalProps> = props => {
  const { value, format, autoOk, onChange, ampm, forwardedRef, seconds, minutesStep, ...other } = props;

  return (
    <BasePicker mergePreviousDateOnChange {...props}>
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
          ref={forwardedRef}
          value={value}
          onClear={handleClear}
          onAccept={handleAccept}
          onChange={handleTextFieldChange}
          onDismiss={handleDismiss}
          onSetToday={handleSetTodayDate}
          isAccepted={isAccepted}
          format={pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)}
          {...other}
        >
          <TimePicker date={date} onChange={handleChange} ampm={ampm} seconds={seconds} minutesStep={minutesStep} />
        </ModalWrapper>
      )}
    </BasePicker>
  );
};

export default React.forwardRef((props: TimePickerModalProps, ref) => (
  <TimePickerModal {...props} forwardedRef={ref} />
));
