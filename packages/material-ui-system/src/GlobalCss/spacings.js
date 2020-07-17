import combineWithBreakpoints from './combineWithBreakpoints';

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

const values = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export default function spacings(theme) {
  const spacingsSelectors = {};

  Object.keys(properties).forEach((property) => {
    values.forEach((val) => {
      spacingsSelectors[`${property}-${val.toString().replace('.', '-')}`] = {
        [`${properties[property]}`]: `${theme.spacing(val)}px !important`,
      };
    });

    Object.keys(directions).forEach((direction) => {
      values.forEach((val) => {
        const cssProperties =
          direction !== 'x' && direction !== 'y' ? [directions[direction]] : directions[direction];

        const cssKey = `${property}${direction}-${val.toString().replace('.', '-')}`;
        spacingsSelectors[cssKey] = {};
        cssProperties.forEach((cssProperty) => {
          spacingsSelectors[cssKey][`${properties[property]}${cssProperty}`] = `${theme.spacing(val)}px !important`;
        });
      });
    });
  });

  return combineWithBreakpoints(theme, spacingsSelectors);
}
