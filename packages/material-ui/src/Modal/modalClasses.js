import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}

const modalClasses = generateUtilityClasses('MuiModal', ['root', 'hidden']);

export default modalClasses;
