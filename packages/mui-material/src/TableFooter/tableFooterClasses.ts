import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

export interface TableFooterClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableFooterClassKey = keyof TableFooterClasses;

export function getTableFooterUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableFooter', slot);
}

export const getTableFooterClasses = (): TableFooterClasses => generateUtilityClasses('MuiTableFooter', ['root']);

const tableFooterClasses = getTableFooterClasses();

export default tableFooterClasses;
