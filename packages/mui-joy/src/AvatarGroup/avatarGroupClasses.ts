import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AvatarGroupClasses {
  /** Class name applied to the root element. */
  root: string;
}

export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatarGroup', slot);
}

const avatarGroupClasses: AvatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root']);

export default avatarGroupClasses;
