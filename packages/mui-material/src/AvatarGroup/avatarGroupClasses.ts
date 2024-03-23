import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AvatarGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the avatar elements. */
  avatar: string;
}

export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatarGroup', slot);
}

const avatarGroupClasses: AvatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', [
  'root',
  'avatar',
]);

export default avatarGroupClasses;
