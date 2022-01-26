import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface TableContainerClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableContainerClassKey = keyof TableContainerClasses;

export function getTableContainerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableContainer', slot);
}

const tableContainerClasses: TableContainerClasses = generateUtilityClasses('MuiTableContainer', [
  'root',
]);

export default tableContainerClasses;
