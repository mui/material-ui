import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepperUtilityClass(slot) {
  return generateUtilityClass('MuiStepper', slot);
}

const stepperClasses = generateUtilityClasses('MuiStepper', [
  'root',
  'horizontal',
  'vertical',
  'alternativeLabel',
]);

export default stepperClasses;
