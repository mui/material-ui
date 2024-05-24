import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface GridClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `container={true}`. */
  container: string;
  /** Styles applied to the root element if `item={true}`. */
  item: string;
  /** Styles applied to the root element if `zeroMinWidth={true}`. */
  zeroMinWidth: string;
  /** Styles applied to the root element if `direction="column"`. */
  'direction-xs-column': string;
  /** Styles applied to the root element if `direction="column-reverse"`. */
  'direction-xs-column-reverse': string;
  /** Styles applied to the root element if `direction="row-reverse"`. */
  'direction-xs-row-reverse': string;
  /** Styles applied to the root element if `wrap="nowrap"`. */
  'wrap-xs-nowrap': string;
  /** Styles applied to the root element if `wrap="reverse"`. */
  'wrap-xs-wrap-reverse': string;
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
}

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
