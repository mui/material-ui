import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
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
  onDateChange: PickerOnChangeFn;
  /** On change callback @DateIOType */
  onChange: PickerOnChangeFn;
  /** Get clock number aria-text for hours */
  getHoursClockNumberText?: (hoursText: string) => string;
  /** Get clock number aria-text for minutes */
  getMinutesClockNumberText?: (minutesText: string) => string;
  /** Get clock number aria-text for seconds */
  getSecondsClockNumberText?: (secondsText: string) => string;
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
}

const getHoursAriaText = (hour: string) => `${hour} hours`;
const getMinutesAriaText = (minute: string) => `${minute} minutes`;
const getSecondsAriaText = (seconds: string) => `${seconds} seconds`;
export const ClockView: React.FC<ClockViewProps> = ({
  type,
  onDateChange,
  onChange,
  ampm,
  date,
  minutesStep,
  ampmInClock,
  allowKeyboardControl,
  getHoursClockNumberText = getHoursAriaText,
  getMinutesClockNumberText = getMinutesAriaText,
  getSecondsClockNumberText = getSecondsAriaText,
}) => {
  const utils = useUtils();
  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours':
        const handleHoursChange = (value: number, isFinish?: boolean | symbol) => {
          const currentMeridiem = getMeridiem(date, utils);
          const updatedTimeWithMeridiem = convertToMeridiem(
            utils.setHours(date, value),
            currentMeridiem,
            Boolean(ampm),
            utils
          );

          onChange(updatedTimeWithMeridiem, isFinish);
        };

        return {
          onChange: handleHoursChange,
          value: utils.getHours(date),
          children: getHourNumbers({
            date,
            utils,
            onChange: handleHoursChange,
            ampm: Boolean(ampm),
            getClockNumberText: getHoursClockNumberText,
          }),
        };

      case 'minutes':
        const minutesValue = utils.getMinutes(date);
        const handleMinutesChange = (value: number, isFinish?: boolean | symbol) => {
          const updatedTime = utils.setMinutes(date, value);

          onChange(updatedTime, isFinish);
        };

        return {
          value: minutesValue,
          onChange: handleMinutesChange,
          children: getMinutesNumbers({
            utils,
            value: minutesValue,
            onChange: handleMinutesChange,
            getClockNumberText: getMinutesClockNumberText,
          }),
        };

      case 'seconds':
        const secondsValue = utils.getSeconds(date);
        const handleSecondsChange = (value: number, isFinish?: boolean | symbol) => {
          const updatedTime = utils.setSeconds(date, value);

          onChange(updatedTime, isFinish);
        };

        return {
          value: secondsValue,
          onChange: handleSecondsChange,
          children: getMinutesNumbers({
            utils,
            value: secondsValue,
            onChange: handleSecondsChange,
            getClockNumberText: getSecondsClockNumberText,
          }),
        };

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [
    ampm,
    date,
    getHoursClockNumberText,
    getMinutesClockNumberText,
    getSecondsClockNumberText,
    onChange,
    type,
    utils,
  ]);

  return (
    <Clock
      date={date}
      ampmInClock={ampmInClock}
      onDateChange={onDateChange}
      type={type}
      ampm={ampm}
      minutesStep={minutesStep}
      allowKeyboardControl={allowKeyboardControl}
      {...viewProps}
    />
  );
};

ClockView.displayName = 'ClockView';

// @ts-ignore
ClockView.propTypes = {
  date: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  ampm: PropTypes.bool,
  minutesStep: PropTypes.number,
  type: PropTypes.oneOf(['minutes', 'hours', 'seconds']).isRequired,
};

ClockView.defaultProps = {
  ampm: true,
  minutesStep: 1,
};

export default React.memo(ClockView);
