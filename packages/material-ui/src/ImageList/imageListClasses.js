import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getImageListUtilityClass(slot) {
  return generateUtilityClass('MuiImageList', slot);
}

const imageListClasses = generateUtilityClasses('MuiImageList', [
  'root',
  'masonry',
  'quilted',
  'standard',
  'woven',
]);

export default imageListClasses;
