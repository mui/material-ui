import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TypographyClasses {
  /** Class name applied to the root element. */
  root: string;
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
  /** Class name applied to the root element if `nowrap={true}`. */
  noWrap: string;
  /** Class name applied to the root element if `gutterBottom={true}`. */
  gutterBottom: string;
  /** Class name applied to the startDecorator element */
  startDecorator: string;
  /** Class name applied to the endDecorator element */
  endDecorator: string;
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
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTypography', slot);
}

const typographyClasses: TypographyClasses = generateUtilityClasses('MuiTypography', [
  'root',
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
  'noWrap',
  'gutterBottom',
  'startDecorator',
  'endDecorator',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default typographyClasses;
