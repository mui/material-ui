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

const values = Array.from(Array(17).keys()); // 0..16

export default function spacings(theme) {
  const spacings = {};

  Object.keys(properties).forEach((property) => {
    values.forEach((val) => {
      spacings[`.${property}-${val}`] = {
        [`${properties[property]}`]: theme.spacing(val / 2),
      };
    });

    Object.keys(directions).forEach((direction) => {
      values.forEach((val) => {
        const cssProperties =
          direction !== 'x' && direction !== 'y'
            ? [directions[direction]]
            : directions[direction];

        const cssKey = `.${property}${direction}-${val}`;
        spacings[cssKey] = {};
        cssProperties.forEach((cssProperty) => {
          spacings[cssKey][
            `${properties[property]}${cssProperty}`
          ] = theme.spacing(val / 2);
        });
      });
    });
  });

  return spacings;
}
