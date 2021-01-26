import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getImageListItemBarUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItemBar', slot);
}

const imageListItemBarClasses = generateUtilityClasses('MuiImageListItemBar', [
  'root',
  'positionBottom',
  'positionTop',
  'positionBelow',
  'titleWrap',
  'titleWrapBelow',
  'titleWrapActionPosLeft',
  'titleWrapActionPosRight',
  'title',
  'subtitle',
  'actionIcon',
  'actionIconActionPosLeft',
]);

export default imageListItemBarClasses; /* Styles applied to the root element. */
