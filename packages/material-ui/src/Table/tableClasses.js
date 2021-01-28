import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getTableUtilityClass(slot) {
  return generateUtilityClass('MuiTable', slot);
}

const tableClasses = generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);

export default tableClasses;
