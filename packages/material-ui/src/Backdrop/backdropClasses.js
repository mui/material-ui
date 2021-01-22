import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}

const backdropClasses = generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);

export default backdropClasses;
