import style from './style';
import compose from './compose';

export const color = style({
  prop: 'color',
  themeKey: 'palette',
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

export const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
});

const palette = compose(color, bgcolor, backgroundColor);

export default palette;
