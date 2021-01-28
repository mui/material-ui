import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass('MuiCardHeader', slot);
}

const cardHeaderClasses = generateUtilityClasses('MuiCardHeader', [
  'root',
  'avatar',
  'action',
  'content',
  'title',
  'subheader',
]);

export default cardHeaderClasses;
