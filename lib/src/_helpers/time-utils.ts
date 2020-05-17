import { IUtils } from '@date-io/core/IUtils';
import { ParsableDate } from '../constants/prop-types';
import { MaterialUiPickersDate } from '../typings/date';
import { MuiPickersAdapter } from '../_shared/hooks/useUtils';

type Meridiem = 'am' | 'pm' | null;

export const getMeridiem = (
  date: MaterialUiPickersDate,
  utils: IUtils<MaterialUiPickersDate>
): Meridiem => {
  if (!date) {
    return null;
  }

  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};

export const convertValueToMeridiem = (value: number, meridiem: Meridiem, ampm: boolean) => {
  if (ampm) {
    const currentMeridiem = value >= 12 ? 'pm' : 'am';
    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }

  return value;
};

export const convertToMeridiem = (
  time: MaterialUiPickersDate,
  meridiem: 'am' | 'pm',
  ampm: boolean,
  utils: IUtils<MaterialUiPickersDate>
) => {
  const newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};

const clockCenter = {
  x: 260 / 2,
  y: 260 / 2,
};

const baseClockPoint = {
  x: clockCenter.x,
  y: 0,
};

const cx = baseClockPoint.x - clockCenter.x;
const cy = baseClockPoint.y - clockCenter.y;

const rad2deg = (rad: number) => rad * 57.29577951308232;

const getAngleValue = (step: number, offsetX: number, offsetY: number) => {
  const x = offsetX - clockCenter.x;
  const y = offsetY - clockCenter.y;

  const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

  let deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;

  const value = Math.floor(deg / step) || 0;
  const delta = Math.pow(x, 2) + Math.pow(y, 2);
  const distance = Math.sqrt(delta);

  return { value, distance };
};

export const getMinutes = (offsetX: number, offsetY: number, step = 1) => {
  const angleStep = step * 6;
  let { value } = getAngleValue(angleStep, offsetX, offsetY);
  value = (value * step) % 60;

  return value;
};

export const getHours = (offsetX: number, offsetY: number, ampm: boolean) => {
  let { value, distance } = getAngleValue(30, offsetX, offsetY);
  value = value || 12;

  if (!ampm) {
    if (distance < 90) {
      value += 12;
      value %= 24;
    }
  } else {
    value %= 12;
  }

  return value;
};

export function getSecondsInDay(date: MaterialUiPickersDate, utils: MuiPickersAdapter) {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
}

export const createIsAfterIgnoreDatePart = (
  disableTimeValidationIgnoreDatePart: boolean,
  utils: MuiPickersAdapter
) => (dateLeft: MaterialUiPickersDate, dateRight: MaterialUiPickersDate) => {
  if (disableTimeValidationIgnoreDatePart) {
    return utils.isAfter;
  }

  return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
};

export interface TimeValidationProps {
  /** Min time acceptable time. For input validation date part of passed object will be ignored if `disableTimeValidationIgnoreDatePart` not specified. */
  minTime?: MaterialUiPickersDate;
  /** Max time acceptable time. For input validation date part of passed object will be ignored if `disableTimeValidationIgnoreDatePart` not specified. */
  maxTime?: MaterialUiPickersDate;
  /** Dynamically check if time is disabled or not. If returns `false` appropriate time point will ot be acceptable. */
  shouldDisableTime?: (timeValue: number, clockType: 'hours' | 'minutes' | 'seconds') => boolean;
  /** Do not ignore date part when validating min/max time
   * @default false
   */
  disableTimeValidationIgnoreDatePart?: boolean;
}

export const validateTime = (
  utils: MuiPickersAdapter,
  value: MaterialUiPickersDate | ParsableDate,
  { minTime, maxTime, shouldDisableTime, disableTimeValidationIgnoreDatePart }: TimeValidationProps
) => {
  const date = utils.date(value);
  const isAfterComparingFn = createIsAfterIgnoreDatePart(
    Boolean(disableTimeValidationIgnoreDatePart),
    utils
  );

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfterComparingFn(minTime, date)):
      return 'minTime';

    case Boolean(maxTime && isAfterComparingFn(date, maxTime)):
      return 'maxTime';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getHours(date), 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getMinutes(date), 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getSeconds(date), 'seconds')):
      return 'shouldDisableTime-seconds';

    default:
      return null;
  }
};

export type TimeValidationError = ReturnType<typeof validateTime>;
