import generateUtilityClass from '../generateUtilityClass';
import generateUtilityClasses from '../generateUtilityClasses';

export interface TablePaginationUnstyledClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the Toolbar component. */
  toolbar: string;
  /** Styles applied to the spacer element. */
  spacer: string;
  /** Styles applied to the select label Typography element. */
  selectLabel: string;
  /** Styles applied to the Select component `root` element. */
  selectRoot: string;
  /** Styles applied to the Select component `select` class. */
  select: string;
  /** Styles applied to the Select component `icon` class. */
  selectIcon: string;
  /** Styles applied to the Select component `root` element. */
  input: string;
  /** Styles applied to the MenuItem component. */
  menuItem: string;
  /** Styles applied to the displayed rows Typography element. */
  displayedRows: string;
  /** Styles applied to the internal `TablePaginationUnstyledActions` component. */
  actions: string;
}

export type TablePaginationUnstyledClassKey = keyof TablePaginationUnstyledClasses;

export function getTablePaginationUnstyledUtilityClass(slot: string): string {
  return generateUtilityClass('BaseTablePagination', slot);
}

const tablePaginationUnstyledClasses: TablePaginationUnstyledClasses = generateUtilityClasses(
  'BaseTablePagination',
  [
    'root',
    'toolbar',
    'spacer',
    'selectLabel',
    'selectRoot',
    'select',
    'selectIcon',
    'input',
    'menuItem',
    'displayedRows',
    'actions',
  ],
);

export default tablePaginationUnstyledClasses;
