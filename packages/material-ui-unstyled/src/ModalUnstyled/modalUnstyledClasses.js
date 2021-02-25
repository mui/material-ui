import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export function getModalUtilityClass(slot) {
  return generateUtilityClass('MuiModal', slot);
}

const modalUnstyledClasses = generateUtilityClasses('MuiModal', ['root', 'hidden']);

export default modalUnstyledClasses;
