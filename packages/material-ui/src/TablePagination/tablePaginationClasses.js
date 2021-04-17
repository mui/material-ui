import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass('MuiTablePagination', slot);
}

const tablePaginationClasses = generateUtilityClasses('MuiTablePagination', [
  'root',
  'toolbar',
  'spacer',
  'selectLabel',
  'select',
  'input',
  'menuItem',
  'displayedRows',
  'actions',
]);

export default tablePaginationClasses;
