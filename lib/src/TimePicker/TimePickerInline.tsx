import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import InlineWrapper, { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import TimePicker, { BaseTimePickerProps } from './TimePicker';

export interface TimePickerInlineProps
  extends BasePickerProps,
    BaseTimePickerProps,
    ExtendWrapper<OuterInlineWrapperProps> {}

export const TimePickerInline: React.SFC<TimePickerInlineProps> = props => {
  const { value, format, onChange, ampm, forwardedRef, seconds, minutesStep, ...other } = props;

  return (
    <BasePicker mergePreviousDateOnChange autoOk {...props}>
      {({
        date,
        utils,
        handleChange,
        handleTextFieldChange,
        isAccepted,
        pick12hOr24hFormat,
        handleAccept,
      }) => (
        <InlineWrapper
          innerRef={forwardedRef}
          value={value}
          onChange={handleTextFieldChange}
          isAccepted={isAccepted}
          handleAccept={handleAccept}
          format={pick12hOr24hFormat(utils.time12hFormat, utils.time24hFormat)}
          {...other}
        >
          <TimePicker date={date} onChange={handleChange} ampm={ampm} seconds={seconds} minutesStep={minutesStep} />
        </InlineWrapper>
      )}
    </BasePicker>
  );
};

export default React.forwardRef((props: TimePickerInlineProps, ref) => (
  <TimePickerInline {...props} forwardedRef={ref} />
));
