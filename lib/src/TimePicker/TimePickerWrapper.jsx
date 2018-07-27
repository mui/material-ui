import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';
import DomainPropTypes from '../constants/prop-types';
import BasePicker from '../_shared/BasePicker';

export const TimePickerWrapper = (props) => {
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

TimePickerWrapper.propTypes = {
  /** DateTimepicker value */
  value: DomainPropTypes.date,
  /** Date format string for input */
  format: PropTypes.string,
  /** Callback firing when date accepted */
  onChange: PropTypes.func.isRequired,
  /** Auto accept date on minute selection */
  autoOk: PropTypes.bool,
  /** 12h/24h view for hour selection clock */
  ampm: PropTypes.bool,
  /** Show the seconds view */
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.func,
};

TimePickerWrapper.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  forwardedRef: undefined,
  seconds: false,
};

export default React.forwardRef((props, ref) => (
  <TimePickerWrapper {...props} forwardedRef={ref} />
));
