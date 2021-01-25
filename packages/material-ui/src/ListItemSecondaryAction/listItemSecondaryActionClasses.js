import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}

const listItemSecondaryActionClasses = generateUtilityClasses('MuiButton', [
  'root',
  'disableGutters',
]);

export default listItemSecondaryActionClasses;
