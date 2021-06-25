import responsivePropType from './responsivePropType';
import style from './style';
import compose from './compose';
import { createUnaryUnit, getValue } from './spacing';
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

export const borderRadius = (props) => {
  if (props.borderRadius) {
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
  borderRadius,
);

export default borders;
