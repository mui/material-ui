import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass('MuiTableSortLabel', slot);
}

const tableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', [
  'root',
  'active',
  'icon',
  'iconDirectionDesc',
  'iconDirectionAsc',
]);

export default tableSortLabelClasses;
