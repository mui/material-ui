import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface BadgeClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the badge `span` element. */
  badge: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'right' }}`. */
  anchorOriginTopRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'right' }}`. */
  anchorOriginBottomRight: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'top', 'left' }}`. */
  anchorOriginTopLeft: string;
  /** Class name applied to the badge `span` element if `anchorOrigin={{ 'bottom', 'left' }}`. */
  anchorOriginBottomLeft: string;
  /** Class name applied to the badge `span` element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the badge `span` element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the badge `span` element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the badge `span` element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the badge `span` element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** State class applied to the badge `span` element if `invisible={true}`. */
  invisible: string;
  /** State class applied to the badge `span` element if `location="inside"`. */
  locationInside: string;
  /** State class applied to the badge `span` element if `location="outside"`. */
  locationOutside: string;
  /** Class name applied to the badge `span` element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the badge `span` element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the badge `span` element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the badge `span` element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the badge `span` element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the badge `span` element if `variant="solid"`. */
  variantSolid: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = generateUtilityClasses('MuiBadge', [
  'root',
  'badge',
  'anchorOriginTopRight',
  'anchorOriginBottomRight',
  'anchorOriginTopLeft',
  'anchorOriginBottomLeft',
  'colorPrimary',
  'colorDanger',
  'colorNeutral',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'invisible',
  'locationInside',
  'locationOutside',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default badgeClasses;
