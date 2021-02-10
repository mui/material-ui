import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableFooterUtilityClass(slot) {
  return generateUtilityClass('MuiTableFooter', slot);
}

const tableFooterClasses = generateUtilityClasses('MuiTableFooter', ['root']);

export default tableFooterClasses;
