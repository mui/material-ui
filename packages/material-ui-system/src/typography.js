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

export const fontStyle = style({
  prop: 'fontStyle',
  themeKey: 'typography',
});

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'typography',
});

export const letterSpacing = style({
  prop: 'letterSpacing',
});

export const lineHeight = style({
  prop: 'lineHeight',
});

export const textAlign = style({
  prop: 'textAlign',
});

const typography = compose(
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
);

export default typography;
