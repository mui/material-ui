import style from './style';
import compose from './compose';

function getBorder({ value, theme, getPath }) {
  if (typeof value === 'number') {
    return `${value}px solid`;
  }
  const [width, stroke = 'solid', themeColor] = value.split(' ');
  let widthNum = parseInt(width, 10);
  if (isNaN(widthNum)) {
    widthNum = getPath(theme, `borders.${width}`);
  }
  let borderColor;
  if (themeColor) {
    borderColor = getPath(theme, `palette.${themeColor}`);
    return [`${widthNum}px ${stroke}`, borderColor].join(' ');
  }
  return [`${widthNum}px ${stroke}`].join(' ');
}

export const border = style({
  prop: 'border',
  themeKey: 'borders',
  unstableTransform: getBorder,
});

export const borderTop = style({
  prop: 'borderTop',
  themeKey: 'borders',
  unstableTransform: getBorder,
});

export const borderRight = style({
  prop: 'borderRight',
  themeKey: 'borders',
  unstableTransform: getBorder,
});

export const borderBottom = style({
  prop: 'borderBottom',
  themeKey: 'borders',
  unstableTransform: getBorder,
});

export const borderLeft = style({
  prop: 'borderLeft',
  themeKey: 'borders',
  unstableTransform: getBorder,
});

export const borderColor = style({
  prop: 'borderColor',
  themeKey: 'palette',
});

export const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'shape',
});

const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderRadius,
);

export default borders;
