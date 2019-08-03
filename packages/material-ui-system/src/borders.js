import style from './style';
import compose from './compose';

function getBorder(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

export const border = style({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderTop = style({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderRight = style({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderBottom = style({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderLeft = style({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder,
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
