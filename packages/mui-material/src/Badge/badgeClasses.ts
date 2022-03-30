import generateUtilityClasses from '@mui/base/generateUtilityClasses';
import generateUtilityClass from '@mui/base/generateUtilityClass';

export interface BadgeClasses {
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

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'dot',
  'standard',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
  'invisible',
  'colorError',
  'colorInfo',
  'colorPrimary',
  'colorSecondary',
  'colorSuccess',
  'colorWarning',
  'overlapRectangular',
  'overlapCircular',
  // TODO: v6 remove the overlap value from these class keys
  'anchorOriginTopLeftCircular',
  'anchorOriginTopLeftRectangular',
  'anchorOriginTopRightCircular',
  'anchorOriginTopRightRectangular',
  'anchorOriginBottomLeftCircular',
  'anchorOriginBottomLeftRectangular',
  'anchorOriginBottomRightCircular',
  'anchorOriginBottomRightRectangular',
]);

export default badgeClasses;
