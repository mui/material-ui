import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TableFooterClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TableFooterClassKey = keyof TableFooterClasses;

export function getTableFooterUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableFooter', slot);
}

const tableFooterClasses: TableFooterClasses = generateUtilityClasses('MuiTableFooter', ['root']);

export default tableFooterClasses;
