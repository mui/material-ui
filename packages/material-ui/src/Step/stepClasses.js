import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepUtilityClass(slot) {
  return generateUtilityClass('MuiStep', slot);
}

const stepClasses = generateUtilityClasses('MuiStep', [
  'root',
  'horizontal',
  'vertical',
  'alternativeLabel',
  'completed',
]);

export default stepClasses;
