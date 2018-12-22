import style from './style';
import compose from './compose';

export const width = style({
  prop: 'width',
});

export const maxWidth = style({
  prop: 'maxWidth',
});

export const minWidth = style({
  prop: 'minWidth',
});

export const height = style({
  prop: 'height',
});

export const maxHeight = style({
  prop: 'maxHeight',
});

export const minHeight = style({
  prop: 'minHeight',
});

export const sizeWidth = style({
  prop: 'size',
  cssProperty: 'width',
});

export const sizeHeight = style({
  prop: 'size',
  cssProperty: 'height',
});

const sizing = compose(
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
);

export default sizing;
