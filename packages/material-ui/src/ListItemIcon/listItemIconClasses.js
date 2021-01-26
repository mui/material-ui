import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListItemIconUtilityClass(slot) {
  return generateUtilityClass('MuiListItemIcon', slot);
}

const listItemIconClasses = generateUtilityClasses('MuiListItemIcon', [
  'root',
  'alignItemsFlexStart',
]);

export default listItemIconClasses;
