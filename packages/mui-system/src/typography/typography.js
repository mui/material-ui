import style from '../style';
import compose from '../compose';

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

export const textTransform = style({
  prop: 'textTransform',
});

export const lineHeight = style({
  prop: 'lineHeight',
});

export const textAlign = style({
  prop: 'textAlign',
});

export const typographyVariant = style({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography',
});

const typography = compose(
  typographyVariant,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  textTransform,
);

export default typography;
