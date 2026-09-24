import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TablePaginationActionsClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type TablePaginationActionsClassKey = keyof TablePaginationActionsClasses;

export function getTablePaginationActionsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTablePaginationActions', slot);
}

const tablePaginationActionsClasses: TablePaginationActionsClasses = generateUtilityClasses(
  'MuiTablePaginationActions',
  ['root'],
);

export default tablePaginationActionsClasses;
