import style from './style';
import compose from './compose';

export const gridGap = style({
  prop: 'gridGap',
});

export const gridColumnGap = style({
  prop: 'gridColumnGap',
});

export const gridRowGap = style({
  prop: 'gridRowGap',
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
  gridGap,
  gridColumnGap,
  gridRowGap,
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
