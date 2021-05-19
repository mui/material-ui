import { AvatarGroupClassKey } from './AvatarGroup';

export type AvatarGroupClasses = Record<AvatarGroupClassKey, string>;

declare const avatarGroupClasses: AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string;

export default avatarGroupClasses;
