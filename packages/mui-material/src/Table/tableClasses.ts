import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `stickyHeader={true}`. */
  stickyHeader: string;
}

export type TableClassKey = keyof TableClasses;

export function getTableUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTable', slot);
}

export const getTableClasses = (): TableClasses =>
  generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);

const tableClasses = getTableClasses();

export default tableClasses;
