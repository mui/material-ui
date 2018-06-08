import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from '../wrappers/ModalWrapper';
import TimePicker from './TimePicker';
import withUtils from '../_shared/WithUtils';
import DomainPropTypes from '../constants/prop-types';
import BasePicker from '../_shared/BasePicker';

export const TimePickerWrapper = (props) => {
  const {
    value, format, autoOk, onChange, utils, ampm, fadeTimeout, forwardedRef, seconds, ...other
  } = props;

  return (
    <BasePicker {...props}>
      {
        ({
          date,
          handleAccept,
          handleChange,
          handleClear,
          handleDismiss,
          handleSetTodayDate,
          handleTextFieldChange,
          pick12hOr24hFormat,
        }) => (
          <ModalWrapper
            ref={forwardedRef}
            value={value}
            format={pick12hOr24hFormat('hh:mm A', 'HH:mm')}
            onClear={handleClear}
            onAccept={handleAccept}
            onChange={handleTextFieldChange}
            onDismiss={handleDismiss}
            onSetToday={handleSetTodayDate}
            {...other}
          >
            <TimePicker
              date={date}
              onChange={handleChange}
              utils={utils}
              ampm={ampm}
              fadeTimeout={fadeTimeout}
              seconds={seconds}
            />
          </ModalWrapper>
        )
      }
    </BasePicker>
  );
};

TimePickerWrapper.propTypes = {
  utils: PropTypes.object.isRequired,
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
  /** Switching hour/minutes animation timeout in milliseconds (set 0 to disable) */
  fadeTimeout: PropTypes.number,
  /** Show the seconds view */
  seconds: PropTypes.bool,
  forwardedRef: PropTypes.func,
};

TimePickerWrapper.defaultProps = {
  value: new Date(),
  format: undefined,
  autoOk: false,
  ampm: true,
  fadeTimeout: 400,
  forwardedRef: undefined,
  seconds: false,
};

const WithUtils = withUtils()(TimePickerWrapper);
export default React.forwardRef((props, ref) => <WithUtils {...props} forwardedRef={ref} />);
