import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListItemTextUtilityClass(slot) {
  return generateUtilityClass('MuiListItemText', slot);
}

const listItemTextClasses = generateUtilityClasses('MuiListItemText', [
  'root',
  'multiline',
  'dense',
  'inset',
  'primary',
  'secondary',
]);

export default listItemTextClasses;
