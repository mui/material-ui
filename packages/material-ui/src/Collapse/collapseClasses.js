import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCollapseUtilityClass(slot) {
  return generateUtilityClass('MuiCollapse', slot);
}

const collapseClasses = generateUtilityClasses('MuiCollapse', [
  'root',
  'horizontal',
  'wrapper',
  'wrapperInner',
]);

export default collapseClasses;
