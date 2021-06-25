import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface TableHeadClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableHeadClassKey = keyof TableHeadClasses;

export function getTableHeadUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableHead', slot);
}

const tableHeadClasses: TableHeadClasses = generateUtilityClasses('MuiTableHead', ['root']);

export default tableHeadClasses;
