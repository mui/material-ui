import style from './style';
import compose from './compose';
import { handleBreakpoints } from './breakpoints';

function transform(value) {
  return value <= 1 ? `${value * 100}%` : value;
}

export const width = style({
  prop: 'width',
  transform,
});

export const maxWidth = (props) => {
  if (props.maxWidth) {
    const styleFromPropValue = (propValue) => {
      const breakpoint = props.theme.breakpoints.values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue),
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ['maxWidth'];

export const minWidth = style({
  prop: 'minWidth',
  transform,
});

export const height = style({
  prop: 'height',
  transform,
});

export const maxHeight = style({
  prop: 'maxHeight',
  transform,
});

export const minHeight = style({
  prop: 'minHeight',
  transform,
});

export const sizeWidth = style({
  prop: 'size',
  cssProperty: 'width',
  transform,
});

export const sizeHeight = style({
  prop: 'size',
  cssProperty: 'height',
  transform,
});

export const boxSizing = style({
  prop: 'boxSizing',
});

const sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);

export default sizing;
