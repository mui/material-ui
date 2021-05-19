import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableContainerUtilityClass(slot) {
  return generateUtilityClass('MuiTableContainer', slot);
}

const tableContainerClasses = generateUtilityClasses('MuiTableContainer', ['root']);

export default tableContainerClasses;
