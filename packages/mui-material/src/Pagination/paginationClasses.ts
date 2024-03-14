import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface PaginationClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the ul element. */
  ul: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="text"`. */
  text: string;
}

export type PaginationClassKey = keyof PaginationClasses;

export function getPaginationUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPagination', slot);
}

const paginationClasses: PaginationClasses = generateUtilityClasses('MuiPagination', [
  'root',
  'ul',
  'outlined',
  'text',
]);

export default paginationClasses;
