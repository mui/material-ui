import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getMobileStepperUtilityClass(slot) {
  return generateUtilityClass('MuiMobileStepper', slot);
}

const mobileStepperClasses = generateUtilityClasses('MuiMobileStepper', [
  'root',
  'positionBottom',
  'positionTop',
  'positionStatic',
  'dots',
  'dot',
  'dotActive',
  'progress',
]);

export default mobileStepperClasses;
