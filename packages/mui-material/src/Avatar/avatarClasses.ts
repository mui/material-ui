import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AvatarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if not `src` or `srcSet`. */
  colorDefault: string;
  /** Styles applied to the root element if `variant="circular"`. */
  circular: string;
  /** Styles applied to the root element if `variant="rounded"`. */
  rounded: string;
  /** Styles applied to the root element if `variant="square"`. */
  square: string;
  /** Styles applied to the img element if either `src` or `srcSet` is defined. */
  img: string;
  /** Styles applied to the fallback icon */
  fallback: string;
}

export type AvatarClassKey = keyof AvatarClasses;

export function getAvatarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAvatar', slot);
}

const avatarClasses: AvatarClasses = generateUtilityClasses('MuiAvatar', [
  'root',
  'colorDefault',
  'circular',
  'rounded',
  'square',
  'img',
  'fallback',
]);

export default avatarClasses;
