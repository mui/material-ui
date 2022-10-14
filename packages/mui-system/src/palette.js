import style from './style';
import compose from './compose';

function transform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}

export const color = style({
  prop: 'color',
  themeKey: 'palette',
  transform,
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform,
});

export const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform,
});

const palette = compose(color, bgcolor, backgroundColor);

export default palette;
