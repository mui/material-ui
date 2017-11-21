const center = {
  x: 260 / 2,
  y: 260 / 2,
};

const basePoint = {
  x: center.x,
  y: 0,
};

const cx = basePoint.x - center.x;
const cy = basePoint.y - center.y;

const rad2deg = rad => rad * 57.29577951308232;

const getAngleValue = (step, offsetX, offsetY) => {
  const x = offsetX - center.x;
  const y = offsetY - center.y;

  const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

  let deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;

  const value = Math.floor(deg / step) || 0;

  return value;
};

export const getHours = (offsetX, offsetY) => {
  const value = getAngleValue(30, offsetX, offsetY) || 12;

  return value % 12;
};

export const getMinutes = (offsetX, offsetY, step = 6) => {
  const value = getAngleValue(step, offsetX, offsetY);

  return value;
};

export const convertToMeridiem = (time, meridiem) => {
  if (time.format('a') !== meridiem) {
    const hours = meridiem === 'am'
      ? time.hours() - 12
      : time.hours() + 12;

    return time.clone().hours(hours);
  }

  return time;
};

