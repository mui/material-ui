import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export function getAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiAvatar', slot);
}

const avatarClasses = generateUtilityClasses('MuiAvatar', [
  'root',
  'colorDefault',
  'circular',
  'rounded',
  'square',
  'img',
  'fallback',
]);

export default avatarClasses;
