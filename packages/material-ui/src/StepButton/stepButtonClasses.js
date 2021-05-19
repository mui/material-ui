import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepButtonUtilityClass(slot) {
  return generateUtilityClass('MuiStepButton', slot);
}

const stepButtonClasses = generateUtilityClasses('MuiStepButton', [
  'root',
  'horizontal',
  'vertical',
  'touchRipple',
]);

export default stepButtonClasses;
