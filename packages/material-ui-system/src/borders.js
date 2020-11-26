import responsivePropType from './responsivePropType';
import style from './style';
import compose from './compose';
import { createUnaryUnit, getStyleFromPropValue } from './spacing';
import { handleBreakpoints } from './breakpoints';

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

function resolveCssProperty(props, prop, transformer) {
  // Using a hash computation over an array iteration could be faster, but with only 28 items,
  // it isn’t worth the bundle size.
  if (prop !== 'borderRadius') {
    return null;
  }

  const cssProperties = ['borderRadius'];
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

export const borderRadius = (props) => {
  const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');

  return props.borderRadius ? resolveCssProperty(props, 'borderRadius', transformer) : {};
};

borderRadius.propTypes =
  process.env.NODE_ENV !== 'production' ? { borderRadius: responsivePropType } : {};

borderRadius.filterProps = ['borderRadius'];

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
