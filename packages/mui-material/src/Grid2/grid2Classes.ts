import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

const SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
const DIRECTIONS = ['column-reverse', 'column', 'row-reverse', 'row'] as const;
const WRAPS = ['nowrap', 'wrap-reverse', 'wrap'] as const;
const GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export type Grid2DynamicClasses = {
  [key in
    | `spacing-xs-${(typeof SPACINGS)[number]}`
    | `wrap-xs-${(typeof WRAPS)[number]}`
    | `grid-${'xs' | 'sm' | 'md' | 'lg' | 'xl'}-${(typeof GRID_SIZES)[number]}`]: string;
};

export interface Grid2Classes extends Grid2DynamicClasses {
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
}

export type Grid2ClassKey = keyof Grid2Classes;

export function getGrid2UtilityClass(slot: string): string {
  return generateUtilityClass('MuiGrid2', slot);
}

const grid2Classes: Grid2Classes = generateUtilityClasses('MuiGrid2', [
  'root',
  'container',

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
