import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCardMediaUtilityClass(slot) {
  return generateUtilityClass('MuiCardMedia', slot);
}

const cardMediaClasses = generateUtilityClasses('MuiCardMedia', ['root', 'media', 'img']);

export default cardMediaClasses;
