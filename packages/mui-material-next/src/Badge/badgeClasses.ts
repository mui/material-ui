import {
  unstable_generateUtilityClasses as generateUtilityClasses,
  unstable_generateUtilityClass as generateUtilityClass,
} from '@mui/utils';

export interface BadgeClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the badge `span` element. */
  badge: string;
  /** Styles applied to the badge `span` element if `size="small"`. */
  small: string;
  /** Styles applied to the badge `span` element if `size="large"`. */
  large: string;
  /** Styles applied to the badge `span` element if `variant="dot"`. */
  dot: string;
  /** Styles applied to the badge `span` element if `variant="standard"`. */
  standard: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Styles applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
  /** State class applied to the badge `span` element if `invisible={true}`. */
  invisible: string;
  /** Styles applied to the badge `span` element if `color="error"`. */
  colorError: string;
  /** Styles applied to the badge `span` element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the badge `span` element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the badge `span` element if `color="tertiary"`. */
  colorTertiary: string;
  /** Styles applied to the badge `span` element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the badge `span` element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the badge `span` element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the badge `span` element if `overlap="rectangular"`. */
  overlapRectangular: string;
  /** Styles applied to the badge `span` element if `overlap="circular"`. */
  overlapCircular: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'small',
  'large',
  'dot',
  'standard',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
  'invisible',
  'colorError',
  'colorPrimary',
  'colorSecondary',
  'colorTertiary',
  'colorInfo',
  'colorWarning',
  'colorSuccess',
  'overlapRectangular',
  'overlapCircular',
]);

export default badgeClasses;
