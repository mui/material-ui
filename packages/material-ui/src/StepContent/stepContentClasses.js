import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getStepContentUtilityClass(slot) {
  return generateUtilityClass('MuiStepContent', slot);
}

const stepContentClasses = generateUtilityClasses('MuiStepContent', ['root', 'last', 'transition']);

export default stepContentClasses;
