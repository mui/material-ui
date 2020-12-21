import style from './style';
import compose from './compose';

export const gap = style({
  prop: 'gap',
});

export const columnGap = style({
  prop: 'columnGap',
});

export const rowGap = style({
  prop: 'rowGap',
});

export const gridColumn = style({
  prop: 'gridColumn',
});

export const gridRow = style({
  prop: 'gridRow',
});

export const gridAutoFlow = style({
  prop: 'gridAutoFlow',
});

export const gridAutoColumns = style({
  prop: 'gridAutoColumns',
});

export const gridAutoRows = style({
  prop: 'gridAutoRows',
});

export const gridTemplateColumns = style({
  prop: 'gridTemplateColumns',
});

export const gridTemplateRows = style({
  prop: 'gridTemplateRows',
});

export const gridTemplateAreas = style({
  prop: 'gridTemplateAreas',
});

export const gridArea = style({
  prop: 'gridArea',
});

const grid = compose(
  gap,
  columnGap,
  rowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
);

export default grid;
