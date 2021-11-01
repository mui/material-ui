import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableHeadClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableHeadClassKey = keyof TableHeadClasses;

export function getTableHeadUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableHead', slot);
}

export const getTableHeadClasses = (): TableHeadClasses =>
  generateUtilityClasses('MuiTableHead', ['root']);

const tableHeadClasses = getTableHeadClasses();

export default tableHeadClasses;
