import {
  unstable_generateUtilityClass as generateUtilityClass,
  unstable_generateUtilityClasses as generateUtilityClasses,
} from '@mui/utils';
import { GridClasses } from '@mui/system/Grid';

export type GridClassKey = keyof GridClasses;

export function getGridUtilityClass(slot: string): string {
  return generateUtilityClass('MuiGrid', slot);
}

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'] as const;
const WRAPS = ['nowrap', 'wrap-reverse', 'wrap'] as const;
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const gridClasses: GridClasses = generateUtilityClasses('MuiGrid', [
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
