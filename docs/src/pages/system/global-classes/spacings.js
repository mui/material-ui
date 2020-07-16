// TODO: add breakpoints
// vuetifty has breakpoints in the utility classes names
const properties = {
  m: 'margin',
  p: 'padding',
};

const directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17];

export default function spacings(theme) {
  const spacings = {};

  Object.keys(properties).forEach((property) => {
    values.forEach((val, idx) => {
      spacings[`.${property}-${idx}`] = {
        [`${properties[property]}`]: theme.spacing(val),
      };
    });

    Object.keys(directions).forEach((direction) => {
      values.forEach((val, idx) => {
        const cssProperties =
          direction !== 'x' && direction !== 'y'
            ? [directions[direction]]
            : directions[direction];

        const cssKey = `.${property}${direction}-${idx}`;
        spacings[cssKey] = {};
        cssProperties.forEach((cssProperty) => {
          spacings[cssKey][
            `${properties[property]}${cssProperty}`
          ] = theme.spacing(val);
        });
      });
    });
  });

  return spacings;
}
