import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../typings/date';

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

export const getMinutes = (offsetX: number, offsetY: number, step = 1) => {
  const angleStep = step * 6;
  let { value } = getAngleValue(angleStep, offsetX, offsetY);
  value = (value * step) % 60;

  return value;
};

export const getMeridiem = (
  date: MaterialUiPickersDate,
  utils: IUtils<MaterialUiPickersDate>
): 'am' | 'pm' => {
  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};

export const convertToMeridiem = (
  time: MaterialUiPickersDate,
  meridiem: 'am' | 'pm',
  ampm: boolean,
  utils: IUtils<MaterialUiPickersDate>
) => {
  if (ampm) {
    const currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';
    if (currentMeridiem !== meridiem) {
      const hours = meridiem === 'am' ? utils.getHours(time) - 12 : utils.getHours(time) + 12;

      return utils.setHours(time, hours);
    }
  }

  return time;
};
