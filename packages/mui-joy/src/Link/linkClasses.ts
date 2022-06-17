import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface LinkClasses {
  /** Styles applied to the root element. */
  root: string;
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
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Styles applied to the root element if `underline="none"`. */
  underlineNone: string;
  /** Styles applied to the root element if `underline="hover"`. */
  underlineHover: string;
  /** Styles applied to the root element if `underline="always"`. */
  underlineAlways: string;
  /** Styles applied to the root element if `level="h1"`. */
  h1: string;
  /** Styles applied to the root element if `level="h2"`. */
  h2: string;
  /** Styles applied to the root element if `level="h3"`. */
  h3: string;
  /** Styles applied to the root element if `level="h4"`. */
  h4: string;
  /** Styles applied to the root element if `level="h5"`. */
  h5: string;
  /** Styles applied to the root element if `level="h6"`. */
  h6: string;
  /** Styles applied to the root element if `level="body1"`. */
  body1: string;
  /** Styles applied to the root element if `level="body2"`. */
  body2: string;
  /** Styles applied to the root element if `level="body3"`. */
  body3: string;
  /** Styles applied to the startDecorator element */
  startDecorator: string;
  /** Styles applied to the endDecorator element */
  endDecorator: string;
}

export type LinkClassKey = keyof LinkClasses;

export function getLinkUtilityClass(slot: string): string {
  return generateUtilityClass('JoyLink', slot);
}

const linkClasses: LinkClasses = generateUtilityClasses('JoyLink', [
  'root',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'focusVisible',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'underlineNone',
  'underlineHover',
  'underlineAlways',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'body3',
  'startDecorator',
  'endDecorator',
]);

export default linkClasses;
