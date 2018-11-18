import style from './style';
import compose from './compose';

export const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgColor = style({
  prop: 'bg',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(
  textColor,
  bgColor,
);

export default palette;
