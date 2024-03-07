import responsivePropType from '../responsivePropType';
import style from '../style';
import compose from '../compose';
import { createUnaryUnit, getValue } from '../spacing';
import { handleBreakpoints } from '../breakpoints';

export function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }

  return `${value}px solid`;
}

function createBorderStyle(prop, transform) {
  return style({
    prop,
    themeKey: 'borders',
    transform,
  });
}

export const border = createBorderStyle('border', borderTransform);

export const borderTop = createBorderStyle('borderTop', borderTransform);

export const borderRight = createBorderStyle('borderRight', borderTransform);

export const borderBottom = createBorderStyle('borderBottom', borderTransform);

export const borderLeft = createBorderStyle('borderLeft', borderTransform);

export const borderColor = createBorderStyle('borderColor');

export const borderTopColor = createBorderStyle('borderTopColor');

export const borderRightColor = createBorderStyle('borderRightColor');

export const borderBottomColor = createBorderStyle('borderBottomColor');

export const borderLeftColor = createBorderStyle('borderLeftColor');

export const outline = createBorderStyle('outline', borderTransform);

export const outlineColor = createBorderStyle('outlineColor');

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
  outline,
  outlineColor,
);

export default borders;
