import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepIconUtilityClass(slot) {
  return generateUtilityClass('MuiStepIcon', slot);
}

const stepIconClasses = generateUtilityClasses('MuiStepIcon', [
  'root',
  'active',
  'completed',
  'error',
  'text',
]);

export default stepIconClasses;
