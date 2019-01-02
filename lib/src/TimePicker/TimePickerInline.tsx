import * as PropTypes from 'prop-types';
import * as React from 'react';

import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import DomainPropTypes from '../constants/prop-types';
import { ExtendWrapper } from '../wrappers/ExtendWrapper';
import InlineWrapper, { OuterInlineWrapperProps } from '../wrappers/InlineWrapper';
import TimePicker, { BaseTimePickerProps } from './TimePicker';

export interface TimePickerInlineProps
  extends BasePickerProps,
    BaseTimePickerProps,
    ExtendWrapper<OuterInlineWrapperProps> {}

export const TimePickerInline: React.SFC<TimePickerInlineProps> = props => {
  const { value, format, onChange, ampm, forwardedRef, seconds, ...other } = props;

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
          <TimePicker date={date} onChange={handleChange} ampm={ampm} seconds={seconds} />
        </InlineWrapper>
      )}
    </BasePicker>
  );
};

(TimePickerInline as any).propTypes = {
  value: DomainPropTypes.date,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TimePickerInline.defaultProps = {
  ampm: true,
  value: new Date(),
  format: undefined,
  forwardedRef: undefined,
  seconds: false,
};

export default React.forwardRef((props: TimePickerInlineProps, ref) => (
  <TimePickerInline {...props} forwardedRef={ref} />
));
