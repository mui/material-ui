import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableContainerClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableContainerClassKey = keyof TableContainerClasses;

export function getTableContainerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableContainer', slot);
}

export const getTableContainerClasses = (): TableContainerClasses =>
  generateUtilityClasses('MuiTableContainer', ['root']);

const tableContainerClasses = getTableContainerClasses();

export default tableContainerClasses;
