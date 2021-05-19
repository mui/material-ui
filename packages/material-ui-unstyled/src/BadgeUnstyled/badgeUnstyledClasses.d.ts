import { BadgeUnstyledClassKey } from './BadgeUnstyled';

export type BadgeUnstyledClasses = Record<BadgeUnstyledClassKey, string>;

export function getBadgeUtilityClass(slot: string): string;

declare const badgeUnstyledClasses: BadgeUnstyledClasses;

export default badgeUnstyledClasses;
