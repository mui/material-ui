import * as React from 'react';
import * as PropTypes from 'prop-types';
import Clock from './Clock';
import { pipe } from '../../_helpers/utils';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { PickerOnChangeFn } from '../../_shared/hooks/useViews';
import { useParsedDate } from '../../_shared/hooks/useParsedDate';
import { getHourNumbers, getMinutesNumbers } from './ClockNumbers';
import { useMeridiemMode } from '../../TimePicker/TimePickerToolbar';
import { convertValueToMeridiem, getSecondsInDay } from '../../_helpers/time-utils';

export interface ExportedClockViewProps {
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
  /**
   * Enables keyboard listener for moving between days in calendar
   * @default currentWrapper !== 'static'
   */
  allowKeyboardControl?: boolean;
  /** Min time, date part of passed object will be ignored */
  minTime?: MaterialUiPickersDate;
  /** Max time, date part of passed object will be ignored */
  maxTime?: MaterialUiPickersDate;
  /** Dynamically check if time is disabled or not */
  shouldDisableTime?: (timeValue: number, type: 'hours' | 'minutes' | 'seconds') => boolean;
}

export interface ClockViewProps extends ExportedClockViewProps {
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
  minTime: unparsedMinTime,
  maxTime: unparsedMaxTime,
  allowKeyboardControl,
  shouldDisableTime,
  getHoursClockNumberText = getHoursAriaText,
  getMinutesClockNumberText = getMinutesAriaText,
  getSecondsClockNumberText = getSecondsAriaText,
}) => {
  const utils = useUtils();
  const minTime = useParsedDate(unparsedMinTime)
  const maxTime = useParsedDate(unparsedMaxTime)
  const { meridiemMode, handleMeridiemChange } = useMeridiemMode(date, ampm, onDateChange);

  const isTimeDisabled = React.useCallback(
    (rawValue: number, type: 'hours' | 'minutes' | 'seconds') => {
      const validateTimeValue = (timePoint: MaterialUiPickersDate) => {
        // prettier-ignore
        return Boolean(
          (minTime && getSecondsInDay(minTime, utils) > getSecondsInDay(timePoint, utils)) ||
          (maxTime && getSecondsInDay(maxTime, utils) < getSecondsInDay(timePoint, utils)) ||
          (shouldDisableTime && shouldDisableTime(rawValue, type))
        );
      };

      switch (type) {
        case 'hours':
          const hoursWithMeridiem = convertValueToMeridiem(rawValue, meridiemMode, Boolean(ampm));
          return validateTimeValue(
            pipe(
              currentDate => utils.setHours(currentDate, hoursWithMeridiem),
              dateWithHours => utils.setMinutes(dateWithHours, 0),
              dateWithMinutes => utils.setSeconds(dateWithMinutes, 0)
            )(date)
          );
        case 'minutes':
          return validateTimeValue(
            pipe(
              currentDate => utils.setMinutes(currentDate, rawValue),
              dateWithMinutes => utils.setSeconds(dateWithMinutes, 0)
            )(date)
          );
        case 'seconds':
          return validateTimeValue(utils.setSeconds(date, rawValue));
      }
    },
    [ampm, date, maxTime, meridiemMode, minTime, shouldDisableTime, utils]
  );

  const viewProps = React.useMemo(() => {
    switch (type) {
      case 'hours':
        const handleHoursChange = (value: number, isFinish?: boolean | symbol) => {
          const valueWithMeridiem = convertValueToMeridiem(value, meridiemMode, Boolean(ampm));
          onChange(utils.setHours(date, valueWithMeridiem), isFinish);
        };

        return {
          onChange: handleHoursChange,
          value: utils.getHours(date),
          children: getHourNumbers({
            date,
            utils,
            ampm: Boolean(ampm),
            onChange: handleHoursChange,
            getClockNumberText: getHoursClockNumberText,
            isDisabled: value => isTimeDisabled(value, 'hours'),
          }),
        };

      case 'minutes':
        const minutesValue = utils.getMinutes(date);
        const handleMinutesChange = (value: number, isFinish?: boolean | symbol) => {
          onChange(utils.setMinutes(date, value), isFinish);
        };

        return {
          value: minutesValue,
          onChange: handleMinutesChange,
          children: getMinutesNumbers({
            utils,
            value: minutesValue,
            onChange: handleMinutesChange,
            getClockNumberText: getMinutesClockNumberText,
            isDisabled: value => isTimeDisabled(value, 'minutes'),
          }),
        };

      case 'seconds':
        const secondsValue = utils.getSeconds(date);
        const handleSecondsChange = (value: number, isFinish?: boolean | symbol) => {
          onChange(utils.setSeconds(date, value), isFinish);
        };

        return {
          value: secondsValue,
          onChange: handleSecondsChange,
          children: getMinutesNumbers({
            utils,
            value: secondsValue,
            onChange: handleSecondsChange,
            getClockNumberText: getSecondsClockNumberText,
            isDisabled: value => isTimeDisabled(value, 'seconds'),
          }),
        };

      default:
        throw new Error('You must provide the type for ClockView');
    }
  }, [type, utils, date, ampm, getHoursClockNumberText, getMinutesClockNumberText, getSecondsClockNumberText, meridiemMode, onChange, isTimeDisabled]);

  return (
    <Clock
      date={date}
      ampmInClock={ampmInClock}
      onDateChange={onDateChange}
      type={type}
      ampm={ampm}
      minutesStep={minutesStep}
      allowKeyboardControl={allowKeyboardControl}
      isTimeDisabled={isTimeDisabled}
      meridiemMode={meridiemMode}
      handleMeridiemChange={handleMeridiemChange}
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
