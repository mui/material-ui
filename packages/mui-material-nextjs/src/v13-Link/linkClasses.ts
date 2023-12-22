import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { LinkClasses as MuiLinkClasses } from '@mui/material/Link';

export interface LinkClasses extends MuiLinkClasses {
  /**
   * Styles applied to the root element when the link is active.
   */
  active: string;
}

export function getLinkUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLink', slot);
}

const linkClasses: LinkClasses = generateUtilityClasses('MuiLink', [
  'root',
  'underlineNone',
  'underlineHover',
  'underlineAlways',
  'button',
  'focusVisible',
  'active',
]);

export default linkClasses;
