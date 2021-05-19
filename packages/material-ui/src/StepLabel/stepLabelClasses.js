import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepLabelUtilityClass(slot) {
  return generateUtilityClass('MuiStepLabel', slot);
}

const stepLabelClasses = generateUtilityClasses('MuiStepLabel', [
  'root',
  'horizontal',
  'vertical',
  'label',
  'active',
  'completed',
  'error',
  'disabled',
  'iconContainer',
  'alternativeLabel',
  'labelContainer',
]);

export default stepLabelClasses;
