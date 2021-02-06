import style from './style';
import compose from './compose';
import { createUnaryUnit, getStyleFromPropValue } from './spacing';
import { handleBreakpoints } from './breakpoints';
import responsivePropType from './responsivePropType';

function resolveCssProperty(props, prop, transformer) {
  const cssProperties = ['gap'];
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);

  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}

export const gap = (props) => {
  if (props.gap) {
    const transformer = createUnaryUnit(props.theme, 'spacing', 8, 'gap');
    return resolveCssProperty(props, 'gap', transformer);
  }

  return {};
};

gap.propTypes = process.env.NODE_ENV !== 'production' ? { gap: responsivePropType } : {};

gap.filterProps = ['gap'];

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
