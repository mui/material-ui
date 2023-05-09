import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface BadgeClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the badge `span` element. */
  badge: string;
  /** State class applied to the badge `span` element if `invisible={true}`. */
  invisible: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'invisible',
]);

export default badgeClasses;
