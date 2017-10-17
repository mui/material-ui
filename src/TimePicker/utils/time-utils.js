const center = {
  x: 260 / 2,
  y: 260 / 2,
};

const basePoint = {
  x: center.x,
  y: 0,
};

export const rad2deg = rad => rad * 57.29577951308232;

export const getHours = (offsetX, offsetY) => {
  const step = 30;
  const x = offsetX - center.x;
  const y = offsetY - center.y;
  const cx = basePoint.x - center.x;
  const cy = basePoint.y - center.y;

  const atan = Math.atan2(cx, cy) - Math.atan2(x, y);

  let deg = rad2deg(atan);
  deg = Math.round(deg / step) * step;
  deg %= 360;

  let value = Math.floor(deg / step) || 0;
  value = value || 12;
  value %= 12;

  return value;
};
