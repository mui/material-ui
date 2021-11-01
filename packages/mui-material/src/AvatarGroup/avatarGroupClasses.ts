import { generateUtilityClass, generateUtilityClasses } from '@mui/core';

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

export const getAvatarGroupClasses = (): AvatarGroupClasses =>
  generateUtilityClasses('MuiAvatarGroup', ['root', 'avatar']);

const avatarGroupClasses = getAvatarGroupClasses();

export default avatarGroupClasses;
