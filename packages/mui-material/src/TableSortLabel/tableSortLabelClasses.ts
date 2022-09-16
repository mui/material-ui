import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
import generateUtilityClass from '../generateUtilityClass';

export interface TableSortLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if `direction="desc"`. */
  iconDirectionDesc: string;
  /** Styles applied to the icon component if `direction="asc"`. */
  iconDirectionAsc: string;
}

export type TableSortLabelClassKey = keyof TableSortLabelClasses;

export function getTableSortLabelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableSortLabel', slot);
}

const tableSortLabelClasses: TableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', [
  'root',
  'active',
  'icon',
  'iconDirectionDesc',
  'iconDirectionAsc',
]);

export default tableSortLabelClasses;
