import style from './style';
import compose from './compose';

export const gridColumnStart = style({
  prop: 'gridColumnStart',
});

export const gridColumnEnd = style({
  prop: 'gridColumnEnd',
});

export const gridRowStart = style({
  prop: 'gridRowStart',
});

export const gridRowEnd = style({
  prop: 'gridRowEnd',
});

export const gridColumn = style({
  prop: 'gridColumn',
});

export const gridRow = style({
  prop: 'gridRow',
});

export const gridArea = style({
  prop: 'gridArea',
});

export const justifySelf = style({
  prop: 'justifySelf',
});

export const alignSelf = style({
  prop: 'alignSelf',
});

export const placeSelf = style({
  prop: 'placeSelf',
});

const griditem = compose(
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
  gridColumn,
  gridRow,
  gridArea,
  justifySelf,
  alignSelf,
  placeSelf,
);

export default griditem;
