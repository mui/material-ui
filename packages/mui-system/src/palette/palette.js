import style from '../style';
import compose from '../compose';

export function paletteTransform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}

export const color = style({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform,
});

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform,
});

export const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform,
});

const palette = compose(color, bgcolor, backgroundColor);

export default palette;
