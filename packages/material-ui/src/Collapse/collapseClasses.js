import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCollapseUtilityClass(slot) {
  return generateUtilityClass('MuiCollapse', slot);
}

const collapseClasses = generateUtilityClasses('MuiCollapse', [
  'root',
  'horizontal',
  'vertical',
  'entered',
  'hidden',
  'wrapper',
  'wrapperInner',
]);

export default collapseClasses;
