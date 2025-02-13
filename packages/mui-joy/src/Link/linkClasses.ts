import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface LinkClasses {
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
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the link is keyboard focused. */
  focusVisible: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `underline="none"`. */
  underlineNone: string;
  /** Class name applied to the root element if `underline="hover"`. */
  underlineHover: string;
  /** Class name applied to the root element if `underline="always"`. */
  underlineAlways: string;
  /** Class name applied to the root element if `level="h1"`. */
  h1: string;
  /** Class name applied to the root element if `level="h2"`. */
  h2: string;
  /** Class name applied to the root element if `level="h3"`. */
  h3: string;
  /** Class name applied to the root element if `level="h4"`. */
  h4: string;
  /** Class name applied to the root element if `level="title-lg"`. */
  'title-lg': string;
  /** Class name applied to the root element if `level="title-md"`. */
  'title-md': string;
  /** Class name applied to the root element if `level="title-sm"`. */
  'title-sm': string;
  /** Class name applied to the root element if `level="body-lg"`. */
  'body-lg': string;
  /** Class name applied to the root element if `level="body-md"`. */
  'body-md': string;
  /** Class name applied to the root element if `level="body-sm"`. */
  'body-sm': string;
  /** Class name applied to the root element if `level="body-xs"`. */
  'body-xs': string;
  /** Class name applied to the startDecorator element */
  startDecorator: string;
  /** Class name applied to the endDecorator element */
  endDecorator: string;
}

export type LinkClassKey = keyof LinkClasses;

export function getLinkUtilityClass(slot: string): string {
  return generateUtilityClass('MuiLink', slot);
}

const linkClasses: LinkClasses = generateUtilityClasses('MuiLink', [
  'root',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
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
  'title-lg',
  'title-md',
  'title-sm',
  'body-lg',
  'body-md',
  'body-sm',
  'body-xs',
  'startDecorator',
  'endDecorator',
]);

export default linkClasses;
