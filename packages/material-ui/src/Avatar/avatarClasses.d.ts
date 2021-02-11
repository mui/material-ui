import { AvatarClassKey } from './Avatar';

export type AvatarClasses = Record<AvatarClassKey, string>;

declare const avatarClasses: AvatarClasses;

export function getAvatarUtilityClass(slot: string): string;

export default avatarClasses;
