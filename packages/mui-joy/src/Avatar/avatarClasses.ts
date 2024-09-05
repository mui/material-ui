import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface AvatarClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the fallback icon. */
  fallback: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the img element if either `src` or `srcSet` is defined. */
  img: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type AvatarClassKey = keyof AvatarClasses;

export function getAvatarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatar', slot);
}

const avatarClasses: AvatarClasses = generateUtilityClasses('MuiAvatar', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'fallback',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'img',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default avatarClasses;
