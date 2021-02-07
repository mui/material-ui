import style from './style';
import compose from './compose';
import { createUnaryUnit, getValue } from './spacing';
import { handleBreakpoints } from './breakpoints';
import responsivePropType from './responsivePropType';

export const gap = (props) => {
  const propValue = props.gap;

  if (propValue) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = () => ({
      gap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, propValue, styleFromPropValue);
  }

  return null;
};

gap.propTypes = process.env.NODE_ENV !== 'production' ? { gap: responsivePropType } : {};

gap.filterProps = ['gap'];

export const columnGap = (props) => {
  const propValue = props.columnGap;

  if (propValue) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'columnGap');
    const styleFromPropValue = () => ({
      columnGap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, propValue, styleFromPropValue);
  }

  return null;
};

columnGap.propTypes =
  process.env.NODE_ENV !== 'production' ? { columnGap: responsivePropType } : {};

columnGap.filterProps = ['columnGap'];

export const rowGap = (props) => {
  const propValue = props.rowGap;

  if (propValue) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'rowGap');
    const styleFromPropValue = () => ({
      rowGap: getValue(transformer, propValue),
    });
    return handleBreakpoints(props, propValue, styleFromPropValue);
  }

  return null;
};

rowGap.propTypes = process.env.NODE_ENV !== 'production' ? { rowGap: responsivePropType } : {};

rowGap.filterProps = ['rowGap'];

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
