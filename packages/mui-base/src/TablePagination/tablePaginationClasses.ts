import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'TablePagination';

export interface TablePaginationClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the Toolbar component. */
  toolbar: string;
  /** Class name applied to the spacer element. */
  spacer: string;
  /** Class name applied to the select label Typography element. */
  selectLabel: string;
  /** Class name applied to the Select component `root` element. */
  selectRoot: string;
  /** Class name applied to the Select component `select` class. */
  select: string;
  /** Class name applied to the Select component `icon` class. */
  selectIcon: string;
  /** Class name applied to the Select component `root` element. */
  input: string;
  /** Class name applied to the MenuItem component. */
  menuItem: string;
  /** Class name applied to the displayed rows Typography element. */
  displayedRows: string;
  /** Class name applied to the internal `TablePaginationActions` component. */
  actions: string;
}

export type TablePaginationClassKey = keyof TablePaginationClasses;

export function getTablePaginationUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const tablePaginationClasses: TablePaginationClasses = generateUtilityClasses(
  COMPONENT_NAME,
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
