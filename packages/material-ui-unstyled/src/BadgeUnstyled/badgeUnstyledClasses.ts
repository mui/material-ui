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
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="rectangular"`. */
  anchorOriginTopRightRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="rectangular"`. */
  anchorOriginBottomRightRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="rectangular"`. */
  anchorOriginTopLeftRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="rectangular"`. */
  anchorOriginBottomLeftRectangular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }} overlap="circular"`. */
  anchorOriginTopRightCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }} overlap="circular"`. */
  anchorOriginBottomRightCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }} overlap="circular"`. */
  anchorOriginTopLeftCircular: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }} overlap="circular"`. */
  anchorOriginBottomLeftCircular: string;
  /** Pseudo-class applied to the badge `span` element if `invisible={true}`. */
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
  'anchorOriginTopLeftCircular',
  'anchorOriginTopLeftRectangular',
  'anchorOriginTopRightCircular',
  'anchorOriginTopRightRectangular',
  'anchorOriginBottomLeftCircular',
  'anchorOriginBottomLeftRectangular',
  'anchorOriginBottomRightCircular',
  'anchorOriginBottomRightRectangular',
  'invisible',
]);

export default badgeUnstyledClasses;
