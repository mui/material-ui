import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getListItemUtilityClass(slot) {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses = generateUtilityClasses('MuiListItem', [
  'root',
  'container',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'button',
  'secondaryAction',
  'selected',
]);

export default listItemClasses;
