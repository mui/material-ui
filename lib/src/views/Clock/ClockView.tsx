import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { convertToMeridiem, getMeridiem } from '../../_helpers/time-utils';

export interface BaseClockViewProps {
  /**
   * 12h/24h view for hour selection clock
   * @default true
   */
  ampm?: boolean;
  /**
   * Step over minutes
   * @default 1
   */
  minutesStep?: number;
  /**
   * Display ampm controls under the clock (instead of in the toolbar)
   * @default false
   */
  ampmInClock?: boolean;
}

export interface ClockViewProps extends BaseClockViewProps {
  /** Selected date @DateIOType */
  date: MaterialUiPickersDate;
  /** Clock type */
  type: 'hours' | 'minutes' | 'seconds';
  /** On change date without moving between views @DateIOType */
  onDateChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On hour change @DateIOType */
  onHourChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On minutes change @DateIOType */
  onMinutesChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
  /** On seconds change @DateIOType */
  onSecondsChange: (date: MaterialUiPickersDate, isFinish?: boolean) => void;
}

export const ClockView: React.FC<ClockViewProps> = ({
  type,
  onDateChange,
  onHourChange,
  onMinutesChange,
  onSecondsChange,
  ampm,
  date,
  minutesStep,
  ampmInClock,
}) => {
  const utils = useUtils();
  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours':
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

      case 'minutes':
        const minutesValue = utils.getMinutes(date);
        return {
          value: minutesValue,
          children: getMinutesNumbers({ value: minutesValue, utils }),
          onChange: (value: number, isFinish?: boolean) => {
            const updatedTime = utils.setMinutes(date, value);

            onMinutesChange(updatedTime, isFinish);
          },
        };

      case 'seconds':
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
        throw new Error('You must provide the type for ClockView');
    }
  }, [ampm, date, onHourChange, onMinutesChange, onSecondsChange, type, utils]);

  return (
    <Clock
      date={date}
      ampmInClock={ampmInClock}
      onDateChange={onDateChange}
      type={type}
      ampm={ampm}
      minutesStep={minutesStep}
      {...viewProps}
    />
  );
};

ClockView.displayName = 'ClockView';

// @ts-ignore
ClockView.propTypes = {
  date: PropTypes.object.isRequired,
  onHourChange: PropTypes.func.isRequired,
  onMinutesChange: PropTypes.func.isRequired,
  onSecondsChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired,
};

ClockView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(ClockView);
