import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getGridUtilityClass(slot) {
  return generateUtilityClass('MuiGrid', slot);
}

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'];
const ALIGN_CONTENTS = [
  'center',
  'flex-end',
  'flex-start',
  'space-around',
  'space-between',
  'stretch',
];
const ALIGN_ITEMS = ['baseline', 'center', 'flex-end', 'flex-start', 'stretch'];
const JUSTIFY_CONTENTS = [
  'center',
  'flex-end',
  'flex-start',
  'space-around',
  'space-between',
  'space-evenly',
];
const WRAPS = ['nowrap', 'wrap-reverse', 'wrap'];
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const gridClasses = generateUtilityClasses('MuiGrid', [
  'root',
  'container',
  'item',
  'zeroMinWidth',

  // spacings
  ...SPACINGS.map((spacing) => `spacing-xs-${spacing}`),
  // direction values
  ...DIRECTIONS.map((direction) => `direction-xs-${direction}`),
  // align content values
  ...ALIGN_CONTENTS.map((alignContent) => `align-content-xs-${alignContent}`),
  // align items values
  ...ALIGN_ITEMS.map((alignItems) => `align-items-xs-${alignItems}`),
  // wrap values
  ...WRAPS.map((wrap) => `wrap-xs-${wrap}`),
  // justify content values
  ...JUSTIFY_CONTENTS.map((justifyContent) => `justify-content-xs-${justifyContent}`),

  // grid sizes for all breakpoints
  ...GRID_SIZES.map((size) => `grid-xs-${String(size)}`),
  ...GRID_SIZES.map((size) => `grid-sm-${String(size)}`),
  ...GRID_SIZES.map((size) => `grid-md-${String(size)}`),
  ...GRID_SIZES.map((size) => `grid-lg-${String(size)}`),
  ...GRID_SIZES.map((size) => `grid-xl-${String(size)}`),
]);

export default gridClasses;
