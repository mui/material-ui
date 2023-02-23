import responsivePropType from './responsivePropType';
import style from './style';
import compose from './compose';
import { createUnaryUnit, getValue } from './spacing';
import { handleBreakpoints } from './breakpoints';

export function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

export const border = style({
  prop: 'border',
  themeKey: 'borders',
  transform: borderTransform,
});

export const borderTop = style({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: borderTransform,
});

export const borderRight = style({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: borderTransform,
});

export const borderBottom = style({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: borderTransform,
});

export const borderLeft = style({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: borderTransform,
});

export const borderColor = style({
  prop: 'borderColor',
  themeKey: 'palette',
});

export const borderTopColor = style({
  prop: 'borderTopColor',
  themeKey: 'palette',
});

export const borderRightColor = style({
  prop: 'borderRightColor',
  themeKey: 'palette',
});

export const borderBottomColor = style({
  prop: 'borderBottomColor',
  themeKey: 'palette',
});

export const borderLeftColor = style({
  prop: 'borderLeftColor',
  themeKey: 'palette',
});

// false positive
// eslint-disable-next-line react/function-component-definition
export const borderRadius = (props) => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, 'shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }

  return null;
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
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadius,
);

export default borders;
