import style from '../style';
import compose from '../compose';
import { handleBreakpoints, values as breakpointsValues } from '../breakpoints';

export function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}

export const width = style({
  prop: 'width',
  transform: sizingTransform,
});

export const maxWidth = (props) => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      const breakpoint =
        props.theme?.breakpoints?.values?.[propValue] || breakpointsValues[propValue];

      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue),
        };
      }

      if (props.theme?.breakpoints?.unit !== 'px') {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`,
        };
      }

      return {
        maxWidth: breakpoint,
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ['maxWidth'];

export const minWidth = style({
  prop: 'minWidth',
  transform: sizingTransform,
});

export const height = style({
  prop: 'height',
  transform: sizingTransform,
});

export const maxHeight = style({
  prop: 'maxHeight',
  transform: sizingTransform,
});

export const minHeight = style({
  prop: 'minHeight',
  transform: sizingTransform,
});

export const sizeWidth = style({
  prop: 'size',
  cssProperty: 'width',
  transform: sizingTransform,
});

export const sizeHeight = style({
  prop: 'size',
  cssProperty: 'height',
  transform: sizingTransform,
});

export const boxSizing = style({
  prop: 'boxSizing',
});

const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);

export default sizing;
