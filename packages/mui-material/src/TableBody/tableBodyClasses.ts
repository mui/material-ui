import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableBodyClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableBodyClassKey = keyof TableBodyClasses;

export function getTableBodyUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableBody', slot);
}

export const getTableBodyClasses = (): TableBodyClasses =>
  generateUtilityClasses('MuiTableBody', ['root']);

const tableBodyClasses = getTableBodyClasses();

export default tableBodyClasses;
