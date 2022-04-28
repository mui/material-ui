import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface LinkClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `underline="none"`. */
  underlineNone: string;
  /** Styles applied to the root element if `underline="hover"`. */
  underlineHover: string;
  /** Styles applied to the root element if `underline="always"`. */
  underlineAlways: string;
  /** Styles applied to the root element if `component="button"`. */
  button: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="textPrimary"`. */
  colorTextPrimary: string;
  /** Styles applied to the root element if `color="textSecondary"`. */
  colorTextSecondary: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="inherit"`. */
  colorInherit: string;
  /** State class applied to the root element if the link is keyboard focused. */
  focusVisible: string;
}

export type LinkClassKey = keyof LinkClasses;

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
  'colorInherit',
  'colorPrimary',
  'colorError',
  'colorSecondary',
  'colorTextPrimary',
  'colorTextSecondary'
]);

export default linkClasses;
