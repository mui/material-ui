import * as React from 'react';
import * as PropTypes from 'prop-types';

import InlineWrapper from '../wrappers/InlineWrapper';
import TimePicker from './TimePicker';
import DomainPropTypes from '../constants/prop-types';
import BasePicker from '../_shared/BasePicker';

export const TimePickerInline = (props) => {
  const {
    value, format, onChange, ampm, forwardedRef, seconds, ...other
  } = props;

  return (
    <BasePicker {...props} autoOk>
      {
        ({
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
            <TimePicker
              date={date}
              onChange={handleChange}
              ampm={ampm}
              seconds={seconds}
            />
          </InlineWrapper>
        )
      }
    </BasePicker>
  );
};

TimePickerInline.propTypes = {
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

export default React.forwardRef((props, ref) => (
  <TimePickerInline {...props} forwardedRef={ref} />
));
