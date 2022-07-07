import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AvatarGroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return generateUtilityClass('JoyAvatarGroup', slot);
}

const avatarGroupClasses: AvatarGroupClasses = generateUtilityClasses('JoyAvatarGroup', ['root']);

export default avatarGroupClasses;
