import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
import { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';

export interface BadgeClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the badge `span` element. */
  badge: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
}

export type BadgeClassKey = keyof BadgeClasses;

export function getBadgeUtilityClass(slot: string): string {
  return generateUtilityClass('MuiBadge', slot);
}

const badgeClasses: BadgeClasses = {
  ...badgeUnstyledClasses,
  ...generateUtilityClasses('MuiBadge', [
    'colorPrimary',
    'colorDanger',
    'colorInfo',
    'colorNeutral',
    'colorSuccess',
    'colorWarning',
    'sizeSm',
    'sizeMd',
    'sizeLg',
    'variantOutlined',
    'variantLight',
    'variantContained',
  ]),
};

export default badgeClasses;
