import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}

const cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);

export default cardContentClasses;
