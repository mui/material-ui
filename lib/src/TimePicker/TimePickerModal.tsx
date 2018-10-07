import * as React from 'react';
import * as PropTypes from 'prop-types';

import ModalWrapper, { ModalWrapperProps } from '../wrappers/ModalWrapper';
import TimePicker, { BaseTimePickerProps } from './TimePicker';
import DomainPropTypes from '../constants/prop-types';
import BasePicker, { BasePickerProps } from '../_shared/BasePicker';
import { Omit } from '@material-ui/core';

export interface TimePickerModalProps extends
  BasePickerProps,
  BaseTimePickerProps,
  Omit<ModalWrapperProps, 'onChange' | 'value'>
{ }

export const TimePickerModal: React.SFC<TimePickerModalProps> = (props) => {
  const {
    value, format, autoOk, onChange, ampm, forwardedRef, seconds, ...other
  } = props;

  return (
    <BasePicker {...props}>
      {
        ({
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
            <TimePicker
              date={date}
              onChange={handleChange}
              ampm={ampm}
              seconds={seconds}
            />
          </ModalWrapper>
        )
      }
    </BasePicker>
  );
};

(TimePickerModal as any).propTypes = {
  /** DateTimepicker value */
  value: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted [(date: Date) => void] */
  onChange: PropTypes.func.isRequired,
  /** Auto accept date on minute selection */
  autoOk: PropTypes.bool,
  /** 12h/24h view for hour selection clock */
  ampm: PropTypes.bool,
  /** Show the seconds view */
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

TimePickerModal.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  forwardedRef: undefined,
  seconds: false,
};

export default React.forwardRef((props: TimePickerModalProps, ref) => (
  <TimePickerModal {...props} forwardedRef={ref} />
));
