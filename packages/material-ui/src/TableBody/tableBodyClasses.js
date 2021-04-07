import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableBodyUtilityClass(slot) {
  return generateUtilityClass('MuiTableBody', slot);
}

const tableBodyClasses = generateUtilityClasses('MuiTableBody', ['root']);

export default tableBodyClasses;
