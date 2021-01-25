import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getImageListItemUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItem', slot);
}

const imageListItemClasses = generateUtilityClasses('MuiImageListItem', [
  'root',
  'img',
  'standard',
  'woven',
]);

export default imageListItemClasses;
