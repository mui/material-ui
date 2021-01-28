import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getSkeltonUtilityClass(slot) {
  return generateUtilityClass('MuiSkelton', slot);
}

const skeltonClasses = generateUtilityClasses('MuiSkelton', [
  'root',
  'text',
  'rectangular',
  'circular',
  'pulse',
  'wave',
  'withChildren',
  'fitContent',
  'heightAuto',
]);

export default skeltonClasses;
