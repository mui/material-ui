import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TableSortLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `direction="desc"`. */
  directionDesc: string;
  /** Styles applied to the root element if `direction="asc"`. */
  directionAsc: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** Styles applied to the icon component. */
  icon: string;
  /** Styles applied to the icon component if `direction="desc"`.
   * @deprecated Combine the [.MuiTableSortLabel-icon](/material-ui/api/table-sort-label/#TableSortLabel-css-MuiTableSortLabel-icon) and [.MuiTableSortLabel-directionDesc](/material-ui/api/table-sort-label/#table-sort-label-classes-MuiTableSortLabel-directionDesc) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  iconDirectionDesc: string;
  /** Styles applied to the icon component if `direction="asc"`.
   * @deprecated Combine the [.MuiTableSortLabel-icon](/material-ui/api/table-sort-label/#TableSortLabel-css-MuiTableSortLabel-icon) and [.MuiTableSortLabel-directionAsc](/material-ui/api/table-sort-label/#table-sort-label-classes-MuiTableSortLabel-directionAsc) classes instead. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
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
  'directionDesc',
  'directionAsc',
]);

export default tableSortLabelClasses;
