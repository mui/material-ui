import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';

export interface BadgeUnstyledClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the badge `span` element. */
  badge: string;
  /** Class name applied to the badge `span` element if `variant="dot"`. */
  dot: string;
  /** Class name applied to the badge `span` element if `variant="standard"`. */
  standard: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
  /** State class applied to the badge `span` element if `invisible={true}`. */
  invisible: string;
}

export type BadgeUnstyledClassKey = keyof BadgeUnstyledClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeUnstyledClasses: BadgeUnstyledClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'dot',
  'standard',
  'anchorOriginTopLeft',
  'anchorOriginTopRight',
  'anchorOriginBottomLeft',
  'anchorOriginBottomRight',
  'invisible',
]);

export default badgeUnstyledClasses;
