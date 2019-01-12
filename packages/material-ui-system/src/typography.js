import style from './style';
import compose from './compose';

export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'typography',
});

export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'typography',
});

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'typography',
});

export const textAlign = style({
  prop: 'textAlign',
});

const typography = compose(
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
);

export default typography;
