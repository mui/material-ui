import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface LinkClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `component="button"`. */
  button: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the link is keyboard focused. */
  focusVisible: string;
  /** Styles applied to the root element if `variant="text"`. */
  variantText: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** Styles applied to the root element if `underline="none"`. */
  underlineNone: string;
  /** Styles applied to the root element if `underline="hover"`. */
  underlineHover: string;
  /** Styles applied to the root element if `underline="always"`. */
  underlineAlways: string;
}

export type LinkClassKey = keyof LinkClasses;

export function getLinkUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLink', slot);
}

const linkClasses: LinkClasses = generateUtilityClasses('MuiLink', [
  'root',
  'button',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'focusVisible',
  'variantText',
  'variantOutlined',
  'variantLight',
  'variantContained',
  'underlineNone',
  'underlineHover',
  'underlineAlways',
]);

export default linkClasses;
