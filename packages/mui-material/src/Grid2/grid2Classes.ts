import { GridClasses } from '@mui/system/Grid';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface Grid2Classes {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `container={true}`. */
  container: string;
  /** Styles applied to the root element if `direction="column"`. */
  'direction-xs-column': string;
  /** Styles applied to the root element if `direction="column-reverse"`. */
  'direction-xs-column-reverse': string;
  /** Styles applied to the root element if `direction="row-reverse"`. */
  'direction-xs-row-reverse': string;
  /** Styles applied to the root element if `direction="row"`. */
  'direction-xs-row': string;
  'spacing-xs-1': string;
  'spacing-xs-2': string;
  'spacing-xs-3': string;
  'spacing-xs-4': string;
  'spacing-xs-5': string;
  'spacing-xs-6': string;
  'spacing-xs-7': string;
  'spacing-xs-8': string;
  'spacing-xs-9': string;
  'spacing-xs-10': string;
  'wrap-xs-nowrap': string;
  'wrap-xs-wrap-reverse': string;
  'wrap-xs-wrap': string;
  'grid-xs-auto': string;
  'grid-xs-true': string;
  'grid-xs-1': string;
  'grid-xs-2': string;
  'grid-xs-3': string;
  'grid-xs-4': string;
  'grid-xs-5': string;
  'grid-xs-6': string;
  'grid-xs-7': string;
  'grid-xs-8': string;
  'grid-xs-9': string;
  'grid-xs-10': string;
  'grid-xs-11': string;
  'grid-xs-12': string;
  'grid-sm-auto': string;
  'grid-sm-true': string;
  'grid-sm-1': string;
  'grid-sm-2': string;
  'grid-sm-3': string;
  'grid-sm-4': string;
  'grid-sm-5': string;
  'grid-sm-6': string;
  'grid-sm-7': string;
  'grid-sm-8': string;
  'grid-sm-9': string;
  'grid-sm-10': string;
  'grid-sm-11': string;
  'grid-sm-12': string;
  'grid-md-auto': string;
  'grid-md-true': string;
  'grid-md-1': string;
  'grid-md-2': string;
  'grid-md-3': string;
  'grid-md-4': string;
  'grid-md-5': string;
  'grid-md-6': string;
  'grid-md-7': string;
  'grid-md-8': string;
  'grid-md-9': string;
  'grid-md-10': string;
  'grid-md-11': string;
  'grid-md-12': string;
  'grid-lg-auto': string;
  'grid-lg-true': string;
  'grid-lg-1': string;
  'grid-lg-2': string;
  'grid-lg-3': string;
  'grid-lg-4': string;
  'grid-lg-5': string;
  'grid-lg-6': string;
  'grid-lg-7': string;
  'grid-lg-8': string;
  'grid-lg-9': string;
  'grid-lg-10': string;
  'grid-lg-11': string;
  'grid-lg-12': string;
  'grid-xl-auto': string;
  'grid-xl-true': string;
  'grid-xl-1': string;
  'grid-xl-2': string;
  'grid-xl-3': string;
  'grid-xl-4': string;
  'grid-xl-5': string;
  'grid-xl-6': string;
  'grid-xl-7': string;
  'grid-xl-8': string;
  'grid-xl-9': string;
  'grid-xl-10': string;
  'grid-xl-11': string;
  'grid-xl-12': string;
}

export type Grid2ClassKey = keyof GridClasses;

export function getGrid2UtilityClass(slot: string): string {
  return generateUtilityClass('MuiGrid2', slot);
}

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'] as const;
const WRAPS = ['nowrap', 'wrap-reverse', 'wrap'] as const;
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

const grid2Classes: GridClasses = generateUtilityClasses('MuiGrid2', [
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

export default grid2Classes;
