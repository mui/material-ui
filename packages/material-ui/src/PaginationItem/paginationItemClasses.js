import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getPaginationItemUtilityClass(slot) {
  return generateUtilityClass('MuiPaginationItem', slot);
}

const paginationItemClasses = generateUtilityClasses('MuiPaginationItem', [
  'root',
  'page',
  'sizeSmall',
  'sizeLarge',
  'text',
  'textPrimary',
  'textSecondary',
  'outlined',
  'outlinedPrimary',
  'outlinedSecondary',
  'rounded',
  'ellipsis',
  'firstLast',
  'previousNext',
  'focusVisible',
  'disabled',
  'selected',
  'icon',
]);

export default paginationItemClasses;
