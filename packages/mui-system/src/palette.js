import style from './style';
import compose from './compose';

function transform(value, userValue) {
  if (process.env.NODE_ENV !== 'production') {
    if (userValue === 'grey') {
      console.warn(
        [
          `MUI: Because "grey" is both a CSS color and part of the theme's color palette, the palette is being prioritized.`,
          '',
          'Either specify a palette shade (e.g. "grey.500") or use a different CSS color to disambiguate.',
        ].join('\n'),
      );
    }
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
