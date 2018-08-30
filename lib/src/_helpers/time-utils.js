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
  // eslint-disable-next-line no-restricted-properties
  const delta = Math.pow(x, 2) + Math.pow(y, 2);
  const distance = Math.sqrt(delta);

  return { value, distance };
};

export const getHours = (offsetX, offsetY, ampm) => {
  // eslint-disable-next-line
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

export const getMinutes = (offsetX, offsetY, step = 6) => {
  const { value } = getAngleValue(step, offsetX, offsetY);

  return value;
};

export const convertToMeridiem = (time, meridiem, ampm, utils) => {
  if (ampm) {
    const currentMeridiem = utils.getHours(time) >= 12 ? 'pm' : 'am';
    if (currentMeridiem !== meridiem) {
      const hours = meridiem === 'am'
        ? utils.getHours(time) - 12
        : utils.getHours(time) + 12;

      return utils.setHours(time, hours);
    }
  }

  return time;
};
