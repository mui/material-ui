import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

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

export const getPaginationClasses = (): PaginationClasses =>
  generateUtilityClasses('MuiPagination', ['root', 'ul', 'outlined', 'text']);

const paginationClasses = getPaginationClasses();

export default paginationClasses;
