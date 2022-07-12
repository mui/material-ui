import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
import { Grid2Classes } from '@mui/system/Unstable_Grid2';

export type GridClassKey = keyof Grid2Classes;

export function getGridUtilityClass(slot: string): string {
  return generateUtilityClass('JoyGrid', slot);
}

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'] as const;
const WRAPS = ['nowrap', 'wrap-reverse', 'wrap'] as const;
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const gridClasses: Grid2Classes = generateUtilityClasses('JoyGrid', [
  'root',
  'container',
  'item',
  'zeroMinWidth',

  // spacings
  ...SPACINGS.map((spacing) => `spacing-xs-${spacing}` as const),
  // direction values
  ...DIRECTIONS.map((direction) => `direction-xs-${direction}` as const),
  // wrap values
  ...WRAPS.map((wrap) => `wrap-xs-${wrap}` as const),

  // grid sizes for all breakpoints
  ...GRID_SIZES.map((size) => `grid-xs-${size}` as const),
  ...GRID_SIZES.map((size) => `grid-sm-${size}` as const),
  ...GRID_SIZES.map((size) => `grid-md-${size}` as const),
  ...GRID_SIZES.map((size) => `grid-lg-${size}` as const),
  ...GRID_SIZES.map((size) => `grid-xl-${size}` as const),
]);

export default gridClasses;
