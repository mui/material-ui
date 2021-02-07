import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableRowUtilityClass(slot) {
  return generateUtilityClass('MuiTableRow', slot);
}

const tableRowClasses = generateUtilityClasses('MuiTableRow', [
  'root',
  'selected',
  'hover',
  'head',
  'footer',
]);

export default tableRowClasses;
