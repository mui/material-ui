import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import ClockType, { ClockViewType } from '../../constants/ClockType';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { convertToMeridiem, getMeridiem } from '../../_helpers/time-utils';

export interface TimePickerViewProps {
  /** TimePicker value */
  date: MaterialUiPickersDate;
  /** Clock type */
  type: ClockViewType;
  /** 12h/24h clock mode */
  ampm?: boolean;
  /** Minutes step */
  minutesStep?: number;
  /** On hour change */
  onHourChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On minutes change */
  onMinutesChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On seconds change */
  onSecondsChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export const TimePickerView: React.FC<TimePickerViewProps> = ({
  type,
  onHourChange,
  onMinutesChange,
  onSecondsChange,
  ampm,
  date,
  minutesStep,
}) => {
  const utils = useUtils();
  const viewProps = React.useMemo(() => {
    switch (type) {
      case ClockType.HOURS:
        return {
          value: utils.getHours(date),
          children: getHourNumbers({ date, utils, ampm: Boolean(ampm) }),
          onChange: (value: number, isFinish?: boolean) => {
            const currentMeridiem = getMeridiem(date, utils);
            const updatedTimeWithMeridiem = convertToMeridiem(
              utils.setHours(date, value),
              currentMeridiem,
              Boolean(ampm),
              utils
            );

            onHourChange(updatedTimeWithMeridiem, isFinish);
          },
        };

      case ClockType.MINUTES:
        const minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({ value: minutesValue, utils }),
          onChange: (value: number, isFinish?: boolean) => {
            const updatedTime = utils.setMinutes(date, value);

            onMinutesChange(updatedTime, isFinish);
          },
        };

      case ClockType.SECONDS:
        const secondsValue = utils.getSeconds(date);
        return {
          value: secondsValue,
          children: getMinutesNumbers({ value: secondsValue, utils }),
          onChange: (value: number, isFinish?: boolean) => {
            const updatedTime = utils.setSeconds(date, value);

            onSecondsChange(updatedTime, isFinish);
          },
        };

      default:
        throw new Error('You must provide the type for TimePickerView');
    }
  }, [ampm, date, onHourChange, onMinutesChange, onSecondsChange, type, utils]);

  return <Clock type={type} ampm={ampm} minutesStep={minutesStep} {...viewProps} />;
};

TimePickerView.displayName = 'TimePickerView';

TimePickerView.propTypes = {
  date: PropTypes.object.isRequired,
  onHourChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  onSecondsChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
  type: PropTypes.oneOf(Object.keys(ClockType).map(key => ClockType[key as any])).isRequired,
} as any;

TimePickerView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(TimePickerView);
