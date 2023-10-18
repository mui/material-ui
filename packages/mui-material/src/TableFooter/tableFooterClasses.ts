import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

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
